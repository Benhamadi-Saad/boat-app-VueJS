import BoatButtonActions from '@/components/BoatButtonActions.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import factory, { getByTestId } from '@/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

const actionsMock = {
  deleteBoatById: jest.fn(() => Promise.resolve()),
};
const store = () => new Vuex.Store({
  modules: {
    boat: {
      namespaced: true,
      actions: actionsMock,
    },
  },
});
describe('test of component BoatButtonActions use case', () => {
  test('should display actions , when mounted component', async () => {
    expect.assertions(3);

    const wrapper = factory.mount(BoatButtonActions, {
      store: store(),
      propsData: {
        id: 1,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(getByTestId(wrapper, 'btn-edit')).toBeTruthy();
    expect(getByTestId(wrapper, 'btn-delete')).toBeTruthy();
  });
  test('should show edit modal , when click on edit button', async () => {
    expect.assertions(1);

    const wrapper = factory.shallowMount(BoatButtonActions, {
      store: store(),
      propsData: {
        id: 1,
      },
    });
    getByTestId(wrapper, 'btn-edit').trigger('click');
    await flushPromises();
    expect(wrapper.vm.$data.showEditModal).toBeTruthy();
  });
  test('should show confirm delete modal , when click on delete button and cancel delating boat', async () => {
    expect.assertions(2);

    const wrapper = factory.shallowMount(BoatButtonActions, {
      store: store(),
      propsData: {
        id: 1,
      },
    });
    getByTestId(wrapper, 'btn-delete').trigger('click');
    await flushPromises();
    expect(wrapper.vm.$data.showConfirmModal).toBeTruthy();

    wrapper.findComponent(ConfirmModal).vm.$emit('cancel');
    await wrapper.vm.$nextTick();
    expect(actionsMock.deleteBoatById).toHaveBeenCalledTimes(0);
  });

  test('should show confirm delete modal , when click on delete button and confirm delating boat', async () => {
    expect.assertions(2);

    const wrapper = factory.shallowMount(BoatButtonActions, {
      store: store(),
      propsData: {
        id: 1,
      },
    });
    getByTestId(wrapper, 'btn-delete').trigger('click');
    await flushPromises();
    expect(wrapper.vm.$data.showConfirmModal).toBeTruthy();

    wrapper.findComponent(ConfirmModal).vm.$emit('confirm');
    await wrapper.vm.$nextTick();
    expect(actionsMock.deleteBoatById).toHaveBeenCalledTimes(1);
  });
});
