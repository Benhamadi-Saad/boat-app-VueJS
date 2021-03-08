import ConfirmModal from '@/components/ConfirmModal.vue';
import factory, { getByTestId } from '@/test-utils';
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
describe('test of component ConfirmModal use case', () => {
  test('should display dialog with confirmation message , when mounted component', async () => {
    expect.assertions(3);

    const wrapper = factory.mount(ConfirmModal, {
      store: store(),
    });

    expect(wrapper.exists()).toBe(true);
    expect(getByTestId(wrapper, 'btn-cancel')).toBeTruthy();
    expect(getByTestId(wrapper, 'btn-confirm')).toBeTruthy();
  });
  test('should emit event confirm , when click on OK button', async () => {
    expect.assertions(1);

    const wrapper = factory.mount(ConfirmModal, {
      store: store(),
    });
    getByTestId(wrapper, 'btn-confirm').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().confirm).toBeTruthy();
  });
  test('should emit event cancel , when click on Cancel button', async () => {
    expect.assertions(1);

    const wrapper = factory.mount(ConfirmModal, {
      store: store(),
    });
    getByTestId(wrapper, 'btn-cancel').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().cancel).toBeTruthy();
  });
});
