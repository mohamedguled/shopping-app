import Localbase from 'localbase';
import { Categories, CategoryType, Items, ItemType } from '../data';
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
  for (let i = 0; i < Items.length; i++) {
    const item: ItemType = Items[i];
    item.id = i + 1;
    await db.collection('shopping').add(item, item.name);
  }
  for (let y = 0; y < Categories.length; y++) {
    const category: CategoryType = Categories[y];
    await db.collection('categories').add(category, category.name);
  }
}
