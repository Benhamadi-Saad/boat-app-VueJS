/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/plugins/veevalidate';
import {
  createLocalVue, mount, MountOptions, shallowMount, ShallowMountOptions, Wrapper,
} from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

function wrapper() {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  return {
    mount(component: typeof Vue, options: MountOptions<Vue>) {
      return mount(component, {
        vuetify,
        localVue,
        ...options,
      });
    },

    shallowMount(component: typeof Vue, options: ShallowMountOptions<Vue>) {
      return shallowMount(component, {
        vuetify,
        localVue,
        ...options,
      });
    },
  };
}

export const factory = {
  mount: (component: typeof Vue, options: MountOptions<Vue> | ShallowMountOptions<Vue> = {}) => wrapper().mount(component, options) as any,
  shallowMount: (component: typeof Vue, options = {}) => wrapper().shallowMount(component, options) as Wrapper<Vue>,
};

export const getByTestId = (wrapper: Wrapper<Vue>, id: string) => wrapper.find(`[data-test="${id}"]`);

export const emitValue = (wrapper: Wrapper<Vue>, testId: string, nameEvent: string, value?: any) => {
  const element = getByTestId(wrapper, testId);
  element.trigger(nameEvent, value);
};

export default factory;
