import ConfirmModal from '@/components/ConfirmModal.vue';
import EditBoatModal from '@/components/EditBoatModal.vue';
import ListBoat from '@/components/ListBoat.vue';
import { Boat, BoatDetail } from '@/store/modules/boat/model';
import factory, { getByTestId } from '@/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

const actionsMock = {
  fetchAllBoats: jest.fn(() => Promise.resolve()),
  fetchDetailBoatById: jest.fn(() => Promise.resolve()),
};
const store = (boats: Boat[]) => new Vuex.Store({
  modules: {
    boat: {
      namespaced: true,
      state: {
        boats: [...boats],
      },
      actions: actionsMock,
    },
  },
});
describe('test of component ListBoat use case', () => {
  const boatsStored: Boat[] = [{ id: 1, name: 'Name1' }, { id: 2, name: 'Name2' }, { id: 3, name: 'Name3' }];
  test('should display boats , when list of boat is not empty', async () => {
    expect.assertions(5);

    const wrapper = factory.mount(ListBoat, {
      store: store(boatsStored),
    });

    expect(wrapper.exists()).toBe(true);
    expect(actionsMock.fetchAllBoats).toHaveBeenCalled();
    expect(wrapper.html()).toContain('Name1');
    expect(wrapper.html()).toContain('Name2');
    expect(wrapper.html()).toContain('Name3');
  });
});

describe('test of component ListBoat Action', () => {
  const boatsStored: BoatDetail[] = [{ id: 1, name: 'Name1', description: 'description1' }, { id: 2, name: 'Name2', description: 'description1' }, { id: 3, name: 'Name3', description: 'description1' }];
  test('should display description , when expand one row of table boats', async () => {
    expect.assertions(2);

    const wrapper = factory.mount(ListBoat, {
      store: store(boatsStored),
    });

    wrapper.find('.v-data-table__expand-icon').trigger('click');
    await flushPromises();
    expect(actionsMock.fetchDetailBoatById).toHaveBeenCalledTimes(1);
    expect((getByTestId(wrapper, 'data-description').element as any).value).toBe('description1');
  });
  test('should show edit modal , when click on edit', async () => {
    expect.assertions(2);

    const wrapper = factory.mount(ListBoat, {
      store: store(boatsStored),
    });

    getByTestId(wrapper, 'btn-edit').trigger('click');
    await flushPromises();
    expect(actionsMock.fetchDetailBoatById).toHaveBeenCalledTimes(1);

    expect(wrapper.findComponent(EditBoatModal).isVisible()).toBeTruthy();
  });

  test('should show Confirm modal , when click on delete', async () => {
    expect.assertions(1);

    const wrapper = factory.mount(ListBoat, {
      store: store(boatsStored),
    });

    getByTestId(wrapper, 'btn-delete').trigger('click');
    await flushPromises();
    expect(wrapper.findComponent(ConfirmModal).isVisible()).toBeTruthy();
  });
});
