import { produce } from 'immer';
import { useEffectOnce } from 'usehooks-ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BasicItemType,
  Categories,
  CategoryType,
  Items,
  ItemType,
} from '../data';
import Localbase from 'localbase';
const db = new Localbase('db');
import { z } from 'zod';
import { forEach } from 'lodash';

export default function useShoppingCategories(
  name: string,
  categoryName: string,
  deletedName: string
) {
  const [data, setData] = useState<ItemType[] | null>(null);
  const [deletedData, setDeletedData] = useState<ItemType[] | null>(null);
  const [categories, setCategories] = useState<[] | null>(null);

  async function updateCategories(newCategories: []) {
    const oldCategories = await db.collection(categoryName).get();

    if (oldCategories === newCategories) return;
  }

  async function getData() {
    const newArr = [];
    const items = await db.collection(name).get();
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.category = await db
          .collection(categoryName)
          .doc({ name: item.categoryKey })
          .get();
        newArr.push(item);
      }

      const sortedArr = newArr.sort((a, b) => a.category.id - b.category.id);

      setData(sortedArr);
    }
  }

  async function getDeletedData() {
    const newArr = [];
    const items = await db.collection(deletedName).get();

    if (items) {
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          item.category = await db
            .collection(categoryName)
            .doc({ name: item.categoryKey })
            .get();
          newArr.push(item);
        }

        const sortedArr = newArr.sort((a, b) => a.category.id - b.category.id);
        setDeletedData(sortedArr);
      }
    }
  }

  const getHasData = useCallback(() => {
    const nonEmptyArray = z
      .object({
        id: z.number(),
        name: z.string(),
        amount: z.number(),
        isCompleted: z.boolean(),
        categoryKey: z.string(),
        category: z.object({
          name: z.string(),
          id: z.number(),
        }),
      })
      .array()
      .nonempty();

    const isSuccessful = nonEmptyArray.safeParse(data).success;
    return isSuccessful;
  }, [data]);

  const hasData: boolean | undefined = useMemo(() => {
    return getHasData();
  }, [getHasData]);

  async function getCategories() {
    const cat = await db.collection(categoryName).get();
    setCategories(cat);
  }

  useEffect(() => {
    getData();
    getCategories();
    getDeletedData();
  }, [name, categoryName]);

  async function Generate() {
    // for (let i = 0; i < Items.length; i++) {
    //   const item: BasicItemType = Items[i];
    //   item.id = i + 1;
    //   await db.collection(name).add(item, item.name);
    // }
    // for (let y = 0; y < Categories.length; y++) {
    //   const category: CategoryType = Categories[y];
    //   await db.collection(categoryName).add(category, category.name);
    // }

    forEach(Items, async item => {
      const newItem = produce(item, draft => {
        draft.amount = 1;
        draft.isCompleted = false;
      });
      console.log(newItem);
      await db.collection(name).add(newItem, newItem.name);
    });
    forEach(Categories, async category => {
      await db.collection(name).add(category, category.name);
    });
    getData();
  }

  async function Clear() {
    db.collection(name).delete();
    db.collection(categoryName).delete();
    db.collection(deletedName).delete();
    setData(null);
    setDeletedData(null);
  }

  async function updateAmount(id: number, newAmount: number) {
    if (newAmount === 0) {
      deleteItem(id);
    }
    await db.collection(name).doc({ id: id }).update({
      amount: newAmount,
    });
    getData();
  }

  async function changeCompleted(id: number, newValue: boolean) {
    await db.collection(name).doc({ id: id }).update({
      isCompleted: newValue,
    });
    getData();
  }

  async function deleteItem(id: number) {
    const item = await db.collection(name).doc({ id: id }).get();

    if (item) {
      await db.collection(deletedName).add(item, item.name);
      await db.collection(name).doc({ id: id }).delete();
      getData();
      getDeletedData();
    }
  }

  const getAmountOfItems = useCallback(() => {
    let amount = 0;
    let completedAmount = 0;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        amount += 1;

        if (data[i].isCompleted) {
          completedAmount += 1;
        }
      }
    }
    return { amount, completedAmount };
  }, [data]);

  const totalAmount = useMemo(() => {
    const total = getAmountOfItems();

    const percentage = Math.floor((total.completedAmount / total.amount) * 100);
    const amount = total.amount;
    return { amount, percentage };
  }, [getAmountOfItems]);

  const getDeletedAmount = useCallback(() => {
    const totalArr = [];
    if (deletedData) {
      for (let i = 0; i < deletedData.length; i++) {
        totalArr.push(deletedData[i].amount);
      }
    }
    return totalArr;
  }, [deletedData]);

  const deletedAmount = useMemo(() => {
    const total = getDeletedAmount();
    const sum = total.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  }, [getDeletedAmount]);

  async function restoreItem(key: string) {
    const item = await db.collection(deletedName).doc(key).get();

    await db.collection(name).add(item, item.name);
    await db.collection(deletedName).doc(key).delete();

    getData();
    getDeletedData();
  }

  const getStats = useCallback(() => {
    let total = 0;
    let completed = 0;
    let uncompleted = 0;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        total += item.amount;
        if (data[i].isCompleted) {
          completed += item.amount;
        } else {
          uncompleted += item.amount;
        }
      }
    }
    const percentage = Math.floor((completed / total) * 100);
    return {
      total: total,
      completed: completed,
      uncompleted: uncompleted,
      percentage: percentage,
    };
  }, [data]);

  const stats = useMemo(() => {
    const statsData = getStats();
    return statsData;
  }, [getStats]);

  return {
    Generate,
    Clear,
    data,
    categories,
    updateAmount,
    changeCompleted,
    deleteItem,
    hasData,
    updateCategories,
    deletedData,
    deletedAmount,
    totalAmount,
    restoreItem,
    stats,
  };
}
