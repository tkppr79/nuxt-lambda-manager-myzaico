import { mount } from '@vue/test-utils';
import SettingPage from '@/pages/setting.vue';
import FilterList from '@/components/FilterList.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Setting page component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('add filterSet', async () => {
    const wrapper = mount(SettingPage, { vuetify });

    wrapper.find('.v-select').vm.$emit('input', 'tag');
    wrapper.findAll('button').at(0).trigger('click');

    await Vue.nextTick();

    wrapper.vm.filterSets[0].condition = 'AND';
    wrapper.findAll('input[type="text"]').at(2).setValue('TEST JEST');

    await Vue.nextTick();

    const filterLists = wrapper.findAllComponents(FilterList);
    expect(filterLists.at(1).html()).toContain('タグフィルター');
    expect(filterLists.at(1).html()).toContain('TEST');
    expect(filterLists.at(1).html()).toContain('JEST');
  });
});
