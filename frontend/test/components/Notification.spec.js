import { mount } from '@vue/test-utils';
import Notification from '@/components/Notification.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { waitTimer } from '@/test/helpers';

Vue.use(Vuetify);

describe('Notification component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('display & fade notification', async () => {
    const wrapper = mount(Notification, {
      vuetify,
    });

    expect(wrapper.html()).not.toContain('Test Notification');
    wrapper.vm.notify({ text: 'Test Notification', type: 'info', timeout: 50 });

    await waitTimer(10);

    expect(wrapper.html()).toContain('Test Notification');
    expect(wrapper.findAll('.v-snack--active').length).toEqual(1);

    await waitTimer(60);

    expect(wrapper.findAll('.v-snack--active').length).toEqual(0);
  });

  it('stack notifications & display sequentially', async () => {
    const wrapper = mount(Notification, {
      vuetify,
    });

    expect(wrapper.html()).not.toContain('Test Notification 1');
    wrapper.vm.notify({ text: 'Test Notification 1', type: 'info', timeout: 50 });

    await waitTimer(10);

    wrapper.vm.notify({ text: 'Test Notification 2', type: 'info', timeout: 100 });
    expect(wrapper.html()).toContain('Test Notification 1');
    expect(wrapper.findAll('.v-snack--active').length).toEqual(1);

    await waitTimer(560);

    expect(wrapper.html()).not.toContain('Test Notification 1');
    expect(wrapper.html()).toContain('Test Notification 2');
    expect(wrapper.findAll('.v-snack--active').length).toEqual(1);

    await waitTimer(100);

    expect(wrapper.findAll('.v-snack--active').length).toEqual(0);
  });
});
