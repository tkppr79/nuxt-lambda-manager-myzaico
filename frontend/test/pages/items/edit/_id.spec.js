import { mount } from '@vue/test-utils';
import ItemEditPage from '@/pages/items/edit/_id.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Item edit page component', () => {
  let vuetify;
  let $route;
  $route = {
    params: {
      id: '1',
    }
  };

  const item = {
    id: 0,
    tags: 'Test_tag',
    name: 'Test Item',
    sku: 'AAA',
    manufacturer: 'corp_A',
    releaseDate: '2000-01-01',
    listPrice: '1000',
  };

  const form = {
    tags: 'Updated_tag',
    name: 'Updated Item',
    sku: 'BBB',
    manufacturer: 'corp_B',
    releaseDate: '2000-02-02',
    listPrice: '2000',
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('update form state', () => {
    const wrapper = mount(ItemEditPage, {
      vuetify,
      mocks: { $route },
    });
    wrapper.vm.form = item;

    expect(wrapper.vm.form.tags).toBe(item.tags);
    expect(wrapper.vm.form.name).toBe(item.name);
    expect(wrapper.vm.form.sku).toBe(item.sku);
    expect(wrapper.vm.form.manufacturer).toBe(item.manufacturer);
    expect(wrapper.vm.form.releaseDate).toBe(item.releaseDate);
    expect(wrapper.vm.form.listPrice).toBe(item.listPrice);

    const inputs = wrapper.findAll('input');
    inputs.at(0).setValue(form.tags);
    inputs.at(1).setValue(form.name);
    inputs.at(2).setValue(form.sku);
    inputs.at(3).setValue(form.manufacturer);
    inputs.at(5).setValue(form.releaseDate);
    inputs.at(4).setValue(form.listPrice);

    expect(wrapper.vm.form.tags).toBe(form.tags);
    expect(wrapper.vm.form.name).toBe(form.name);
    expect(wrapper.vm.form.sku).toBe(form.sku);
    expect(wrapper.vm.form.manufacturer).toBe(form.manufacturer);
    expect(wrapper.vm.form.listPrice).toBe(form.listPrice);
    expect(wrapper.vm.form.releaseDate).toBe(form.releaseDate);
  });

  it('can submit', () => {
    const methodSpy = jest.spyOn(ItemEditPage.options.methods, 'submit');
    const wrapper = mount(ItemEditPage, {
      vuetify,
      mocks: { $route },
    });
    wrapper.vm.form = item;

    const inputs = wrapper.findAll('input');
    inputs.at(0).setValue(form.tags);
    inputs.at(1).setValue(form.name);
    inputs.at(2).setValue(form.sku);
    inputs.at(3).setValue(form.manufacturer);
    inputs.at(5).setValue(form.releaseDate);
    inputs.at(4).setValue(form.listPrice);

    wrapper.find('button').trigger('click');
    expect(methodSpy).toHaveBeenCalledTimes(1);
  });
});
