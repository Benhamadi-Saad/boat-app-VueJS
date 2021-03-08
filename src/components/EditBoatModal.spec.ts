import EditBoatModal from '@/components/EditBoatModal.vue';
import { Boat } from '@/store/modules/boat/model';
import factory, { emitValue, getByTestId } from '@/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

const actionsMock = {
  fetchDetailBoatById: jest.fn(() => Promise.resolve()),
  updateBoat: jest.fn(() => Promise.resolve()),
  createBoat: jest.fn(() => Promise.resolve()),
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
describe('test of component EditBoatModal use case: Add new boat when boat list is empty', () => {
  test('renders', async () => {
    expect.assertions(2);

    const wrapper = factory.shallowMount(EditBoatModal, {
      store: store([]),
    });

    expect(wrapper.exists()).toBe(true);
    const showDialog = wrapper.findComponent({ name: 'VDialog' });
    expect(showDialog.isVisible()).toBe(true);
  });

  test('renders for add action with empty', async () => {
    expect.assertions(2);

    const wrapper = factory.mount(EditBoatModal, {
      store: store([]),
    });

    expect(wrapper.exists()).toBe(true);
    expect(getByTestId(wrapper, 'data-name').text()).toBe('');
  });
});

describe('test EditBoatModal with one element stored', () => {
  const boatsStored: Boat[] = [{ id: 1, name: 'Name' }];

  test('Use case edit boat : fetch detail and render stored boat ', async () => {
    expect.assertions(4);
    const wrapper = factory.shallowMount(EditBoatModal, {
      store: store(boatsStored),
      propsData: {
        id: 1,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(actionsMock.fetchDetailBoatById).toHaveBeenCalledTimes(1);
    await wrapper.vm.$nextTick();
    const { id, name } = wrapper.vm.$data.editedBoat;
    expect(id).toBe(1);
    expect(name).toBe('Name');
  });

  test('Use case add boat : render with empty imputs', async () => {
    expect.assertions(4);
    const wrapper = factory.shallowMount(EditBoatModal, {
      store: store(boatsStored),
    });

    expect(actionsMock.fetchDetailBoatById).toHaveBeenCalledTimes(0);
    await wrapper.vm.$nextTick();
    const { id, name, description } = wrapper.vm.$data.editedBoat;
    expect(id).toBe(null);
    expect(name).toBe(null);
    expect(description).toBe(null);
  });
});
describe('test EditBoatModal save action', () => {
  test('should not create boat when add new boat form is not valid ', async () => {
    expect.assertions(4);

    const wrapper = factory.mount(EditBoatModal, {
      store: store([]),
    });
    await getByTestId(wrapper, 'data-name').setValue('');
    await emitValue(wrapper, 'data-name', 'blur');

    await getByTestId(wrapper, 'data-description').setValue('');
    await emitValue(wrapper, 'data-description', 'blur');
    await flushPromises();

    const nameFieldError = getByTestId(wrapper, 'data-name-error');
    const descriptionFieldError = getByTestId(wrapper, 'data-description-error');

    expect(nameFieldError.text()).toBe('The name is required');
    expect(descriptionFieldError.text()).toBe('The description is required');

    expect(actionsMock.createBoat).toHaveBeenCalledTimes(0);
    expect(actionsMock.updateBoat).toHaveBeenCalledTimes(0);
  });

  test('should call createBoat method when add new boat form is valid', async () => {
    expect.assertions(2);

    const wrapper = factory.mount(EditBoatModal, {
      store: store([]),
    });
    await getByTestId(wrapper, 'data-name').setValue('Name of boat');
    await emitValue(wrapper, 'data-name', 'blur');
    await getByTestId(wrapper, 'data-description').setValue('Description of boat');
    await emitValue(wrapper, 'data-description', 'blur');
    await flushPromises();
    await wrapper.vm.$nextTick();

    await emitValue(wrapper, 'btn-save', 'click');
    await flushPromises();

    expect(actionsMock.createBoat).toHaveBeenCalled();
    expect(actionsMock.updateBoat).toHaveBeenCalledTimes(0);
  });
  test('should call updateBoat method when edit boat form is valid', async () => {
    expect.assertions(2);
    const boatsStored: Boat[] = [{ id: 1, name: 'Name' }];

    const wrapper = factory.mount(EditBoatModal, {
      store: store(boatsStored),
      propsData: {
        id: 1,
      },
    });
    // await flushPromises();
    // await wrapper.vm.$nextTick();

    await getByTestId(wrapper, 'data-description').setValue('Description of boat');
    await emitValue(wrapper, 'data-description', 'blur');
    await wrapper.vm.$nextTick();
    await flushPromises();

    await emitValue(wrapper, 'btn-save', 'click');
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(actionsMock.updateBoat).toHaveBeenCalled();
    expect(actionsMock.createBoat).toHaveBeenCalledTimes(0);
  });
});
