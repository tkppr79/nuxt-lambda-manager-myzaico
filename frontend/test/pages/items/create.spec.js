import { mount } from '@vue/test-utils';
import ItemCreatePage from '@/pages/items/create.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { waitTimer } from '@/test/helpers';

Vue.use(Vuetify);

describe('Item create page component', () => {
  const form = {
    tags: 'Test Tag',
    name: 'Test Item',
    sku: 'Test SKU',
    manufacturer: 'Test Manufacturer',
    listPrice: 'Test Price',
    releaseDate: '2000-01-01',
  };

  window.alert = jest.fn((message) => console.log(message));

  const getFetchPromise = Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ Items: [] }),
  });
  const postFetchPromise = Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });
  window.fetch = jest.fn((url, options) => {
    if(options.method === 'POST')
      return postFetchPromise;
    else if(options.method === 'GET')
      return getFetchPromise;
  });

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const $store = {
    getters: {
      "user/user": { id: 0, name: '', idToken: '', accessToken: '', filterSets: [] }
    },
  };

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

  it('can submit', async () => {
    const methodSpy = jest.spyOn(ItemCreatePage.options.methods, 'submit');
    const wrapper = mount(ItemCreatePage, {
      vuetify,
      mocks: { $store },
    });

    const inputs = wrapper.findAll('input');
    inputs.at(0).setValue(form.tags);
    inputs.at(1).setValue(form.name);
    inputs.at(2).setValue(form.sku);
    inputs.at(3).setValue(form.manufacturer);
    inputs.at(5).setValue(form.releaseDate);
    inputs.at(4).setValue(form.listPrice);

    wrapper.find('button').trigger('click');
    await waitTimer(10);
    expect(methodSpy).toHaveBeenCalledTimes(1);
  });
});
