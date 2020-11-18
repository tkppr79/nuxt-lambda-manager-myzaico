import { mount } from '@vue/test-utils';
import FilterList from '@/components/FilterList.vue';
import TextFilter from '@/components/TextFilter.vue';
import RangeFilter from '@/components/RangeFilter.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('FilterList component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('display text & range filters', () => {
    const wrapper = mount(FilterList, {
      vuetify,
      propsData: {
        filterSets: [
          {
            id: '001',
            condition: 'OR',
            type: 'text',
            filters: [{ checkbox: false, targetColumn: { label: 'アイテム名', value: 'name' }, searchString: 'item_A'}],
          },
          {
            id: '002',
            condition: 'OR',
            type: 'range',
            filters: [{ checkbox: false, targetColumn: { label: '定価', value: 'listPrice' }, range: { start: 0, end: 0 } }],
          }
        ]
      },
    });

    const textFilter = wrapper.findComponent(TextFilter);
    textFilter.find('input[type="checkbox"]').trigger('click')
    expect(textFilter.emitted('set-checkbox')[0]).toEqual([true])
    textFilter.find('input[type="text"]').setValue('testSearchWord');
    expect(textFilter.emitted('set-search-string')[0]).toEqual(['testSearchWord'])

    const rangeFilter = wrapper.findComponent(RangeFilter);
    rangeFilter.find('input[type="checkbox"]').trigger('click')
    expect(rangeFilter.emitted('set-checkbox')[0]).toEqual([true])
    rangeFilter.findAll('input[type="text"]').at(0).setValue(1000);
    expect(rangeFilter.emitted('set-range')[0]).toEqual([{ start: '1000', end: 0 }])
    rangeFilter.findAll('input[type="text"]').at(1).setValue(2000);
    expect(rangeFilter.emitted('set-range')[1]).toEqual([{ start: 0, end: '2000' }])
  });
});
