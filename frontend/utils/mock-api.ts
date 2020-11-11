import mockStore from '@/utils/mock-store';
import { Item } from '@/types';

export const postItem = (item: Item) => {
  item.id = mockStore.state.items.length + 1;
  mockStore.state.items.push(item);
};
