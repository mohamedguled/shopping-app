import { produce } from 'immer';
import { forEach } from 'lodash';
import Localbase from 'localbase';
import { Categories, Items } from '../data';
const db = new Localbase('db');
db.config.debug = false;
export async function getData() {
  const newArr = [];
  const items = await db.collection('shopping').get();
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.category = await db
        .collection('categories')
        .doc({ name: item.categoryKey })
        .get();
      newArr.push(item);
    }
  }

  if (items.length > 0 && newArr.length > 0) return newArr;
  return null;
}

export async function deleteList() {
  await db.collection('shopping').delete();
  await db.collection('categories').delete();
}

export async function generateList() {
  forEach(Items, async (item, i) => {
    const newItem = produce(item, draft => {
      draft.amount = 1;
      draft.isCompleted = false;
      draft.id = i + 1;
    });
    console.log(newItem);
    await db.collection('shopping').add(newItem, newItem.name);
  });
  forEach(Categories, async category => {
    await db.collection('categories').add(category, category.name);
  });

  // for (let i = 0; i < Items.length; i++) {
  //   const item: BasicItemType = Items[i];
  //   item.id = i + 1;
  //   await db.collection('shopping').add(item, item.name);
  // }
  // for (let y = 0; y < Categories.length; y++) {
  //   const category: CategoryType = Categories[y];
  //   await db.collection('categories').add(category, category.name);
  // }
}
