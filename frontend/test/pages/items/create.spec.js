import { mount } from '@vue/test-utils';
import ItemCreatePage from '@/pages/items/create.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Item create page component', () => {
  let vuetify;

  const form = {
    tags: 'Test Tag',
    name: 'Test Item',
    sku: 'Test SKU',
    manufacturer: 'Test Manufacturer',
    listPrice: 'Test Price',
    releaseDate: '2000-01-01',
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('update form state', () => {
    const wrapper = mount(ItemCreatePage, { vuetify });

    const inputs = wrapper.findAll('input');
    inputs.at(0).setValue(form.tags);
    inputs.at(1).setValue(form.name);
    inputs.at(2).setValue(form.sku);
    inputs.at(3).setValue(form.manufacturer);
    inputs.at(4).setValue(form.listPrice);
    inputs.at(5).setValue(form.releaseDate);

    expect(wrapper.vm.form.tags).toBe(form.tags);
    expect(wrapper.vm.form.name).toBe(form.name);
    expect(wrapper.vm.form.sku).toBe(form.sku);
    expect(wrapper.vm.form.manufacturer).toBe(form.manufacturer);
    expect(wrapper.vm.form.listPrice).toBe(form.listPrice);
    expect(wrapper.vm.form.releaseDate).toBe(form.releaseDate);
  });

  it('can submit', () => {
    const methodSpy = jest.spyOn(ItemCreatePage.options.methods, 'submit');
    const wrapper = mount(ItemCreatePage, { vuetify });

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
