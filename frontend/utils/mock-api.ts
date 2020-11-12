import mockStore from '@/utils/mock-store';
import { Item } from '@/types';

export const getItem = (id: number): Item | null => {
  const items = mockStore.state.items;

  for (let i = 0; i < items.length; i++) {
    if(items[i].id === id)
      return items[i];
  }

  return null;
};

export const postItem = (item: Item): void => {
  item.id = mockStore.state.items.length + 1;
  mockStore.state.items.push(item);
};

export const putItem = (item: Item): void => {
  const items = mockStore.state.items;

  for (let i = 0; i < items.length; i++) {
    if(items[i].id === item.id){
      items[i] = item;
      return;
    }
  }
};
