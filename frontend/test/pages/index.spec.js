import { mount, RouterLinkStub } from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { waitTimer } from '@/test/helpers';
import mockStore from '@/utils/mock-store';

Vue.use(Vuetify);

describe('Index page component', () => {
  const filterSets = [
    {
      id: '001',
      condition: 'OR',
      type: 'text',
      filters: [{ checkbox: false, targetColumn: { label: 'アイテム名', value: 'name' }, searchString: 'Item_1'}],
    },
    {
      id: '002',
      condition: 'OR',
      type: 'range',
      filters: [{ checkbox: false, targetColumn: { label: '定価', value: 'listPrice' }, range: { start: 7000, end: 8000 } }],
    }
  ];

  const itemsFetchPromise = Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ Items: mockStore.state.items }),
  });
  const filterSetsFetchPromise = Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ Item: { filterSets } }),
  });
  window.fetch = jest.fn((url) => {
    if(url.indexOf('items') != -1)
      return itemsFetchPromise;
    else if(url.indexOf('users') != -1)
      return filterSetsFetchPromise;
  });

  let vuetify;
  const $store = {
    getters: {
      "user/user": { id: 0, name: '', idToken: '', accessToken: '', filterSets: [] }
    },
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('filter items by text & range', async () => {
    const wrapper = mount(IndexPage, {
      vuetify,
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub, },
    });

    await waitTimer(10);

    const table = wrapper.find('table');
    expect(table.html()).toContain('testItem_1');
    expect(table.html()).toContain('testItem_2');
    expect(table.html()).toContain('testItem_3');
    expect(table.html()).toContain('testItem_4');
    expect(table.html()).toContain('testItem_5');

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    checkboxes.at(0).trigger('click');

    await Vue.nextTick();

    expect(table.html()).toContain('testItem_1');
    expect(table.html()).not.toContain('testItem_2');
    expect(table.html()).not.toContain('testItem_3');
    expect(table.html()).not.toContain('testItem_4');
    expect(table.html()).not.toContain('testItem_5');

    checkboxes.at(1).trigger('click');

    await Vue.nextTick();

    expect(table.html()).toContain('testItem_1');
    expect(table.html()).not.toContain('testItem_2');
    expect(table.html()).not.toContain('testItem_3');
    expect(table.html()).not.toContain('testItem_4');
    expect(table.html()).not.toContain('testItem_5');
    expect(table.html()).toContain('testItem_6');
  });
});
