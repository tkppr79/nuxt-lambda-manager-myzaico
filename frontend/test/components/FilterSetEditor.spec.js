import { mount } from '@vue/test-utils';
import FilterSetEditor from '@/components/FilterSetEditor.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('FilterSetEditor component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('when a text filter', () => {
    const wrapper = mount(FilterSetEditor, {
      vuetify,
      propsData: {
        filterSet: {
          id: '001',
          condition: 'OR',
          type: 'text',
          filters: [{ checkbox: false, targetColumn: { label: 'アイテム名', value: 'name' }, searchString: 'item_A'}],
        }
      },
    });

    const texts = wrapper.findAll('.v-select__selections > .v-select__selection--comma');
    expect(texts.at(0).text()).toBe('OR');
    expect(texts.at(1).text()).toBe('テキスト');
    expect(texts.at(2).text()).toBe('アイテム名');
  });

  it('when a range filter', () => {
    const spy = jest.spyOn(FilterSetEditor.options.methods, 'onTargetColumnChange');
    const wrapper = mount(FilterSetEditor, {
      vuetify,
      propsData: {
        filterSet: {
          id: '002',
          condition: 'OR',
          type: 'range',
          filters: [{ checkbox: false, targetColumn: { label: '定価', value: 'listPrice' }, range: { start: 0, end: 0 } }],
        },
      },
    });

    const texts = wrapper.findAll('.v-select__selections > .v-select__selection--comma');
    expect(texts.at(0).text()).toBe('OR');
    expect(texts.at(1).text()).toBe('範囲');
    expect(texts.at(2).text()).toBe('定価');

    wrapper.findAll('.v-select').at(2).vm.$emit('change', { label: '発売日', value: 'releaseDate' });
    expect(spy).toHaveBeenCalledWith({ label: '発売日', value: 'releaseDate' });
  });

  it('when a tag filter', () => {
    const wrapper = mount(FilterSetEditor, {
      vuetify,
      propsData: {
        filterSet: {
          id: '003',
          condition: 'OR',
          type: 'tag',
          tagString: 'テスト Jest',
          filters: [{ checkbox: false, tag: '' }, { checkbox: false, tag: '' }],
        },
      },
    });

    wrapper.findAll('input[type="text"]').at(2).setValue('TEST JEST');

    const texts = wrapper.findAll('.v-select__selections > .v-select__selection--comma');
    expect(texts.at(0).text()).toBe('OR');
    expect(texts.at(1).text()).toBe('タグ');
    expect(wrapper.emitted('set-filter-set')[0]).toEqual([{
      id: '003',
      condition: 'OR',
      type: 'tag',
      tagString: 'TEST JEST',
      filters: [{ checkbox: false, tag: 'TEST' }, { checkbox: false, tag: 'JEST' }]
    }]);
  });
});
