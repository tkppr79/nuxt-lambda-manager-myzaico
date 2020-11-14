import { Item, FilterSet } from '@/types';

const mockStore: {
  state: {
    items: Item[],
    filterSets: FilterSet[],
  }
} = {
  state: {
    items: [
      { id: 1, tags: 'アパレル', name: 'testItem_1', sku: 'AAAAA', manufacturer: 'メーカーA', releaseDate: '2020-10-01', listPrice: 3000 },
      { id: 2, tags: '家電', name: 'testItem_2', sku: 'BBBBB', manufacturer: 'メーカーB', releaseDate: '2020-10-05', listPrice: 2000 },
      { id: 3, tags: 'パソコン', name: 'testItem_3', sku: 'CCCCC', manufacturer: 'メーカーC', releaseDate: '2020-10-10', listPrice: 3000 },
      { id: 4, tags: '本', name: 'testItem_4', sku: 'DDAAAD', manufacturer: 'メーカーD', releaseDate: '2020-10-15', listPrice: 4000 },
      { id: 5, tags: 'ゲーム', name: 'testItem_5', sku: 'EEEEE', manufacturer: 'メーカーE', releaseDate: '2020-10-20', listPrice: 1000 },
      { id: 6, tags: '食品', name: 'testItem_6', sku: 'FFFFF', manufacturer: 'メーカーF', releaseDate: '2020-10-25', listPrice: 7000 },
    ],
    filterSets: [],
  },
};

export default mockStore;
