import mockStore from '@/utils/mock-store';
import { Item, FilterSet } from '@/types';

export const getItems = (): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStore.state.items);
    }, Math.random() * 10);
  });
};

export const getItem = (id: number): Promise<Item | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = mockStore.state.items;

      for (let i = 0; i < items.length; i++) {
        if(items[i].id === id){
          resolve (items[i]);
          return;
        }
      }

      resolve(null);
    }, Math.random() * 10);
  });
};

export const postItem = (item: Item): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      item.id = mockStore.state.items.length + 1;
      mockStore.state.items.push(item);
      resolve();
    }, Math.random() * 10);
  });
};

export const putItem = (item: Item): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = mockStore.state.items;

      for (let i = 0; i < items.length; i++) {
        if(items[i].id === item.id){
          items[i] = item;
          resolve();
          return;
        }
      }
    }, Math.random() * 10);
  });
};

export const deleteItem = (id: number): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockStore.state.items = mockStore.state.items.filter(item => item.id !== id);
      resolve(mockStore.state.items);
    }, Math.random() * 10);
  });
};

export const getFilterSets = (): Promise<FilterSet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStore.state.filterSets);
    }, Math.random() * 10);
  });
};

export const postFilterSets = (filterSets: FilterSet[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockStore.state.filterSets = filterSets;
      resolve();
    }, Math.random() * 10);
  });
};
