import { mount, RouterLinkStub } from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Index page component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('filter items by text & range', async () => {
    const wrapper = mount(IndexPage, {
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub
      },
    });

    wrapper.vm.filterSets = [
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

    await Vue.nextTick();

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
