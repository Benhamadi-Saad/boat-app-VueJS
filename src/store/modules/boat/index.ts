import { RootState } from '@/store/model';
import actions from '@/store/modules/boat/actions';
import mutations from '@/store/modules/boat/mutations';
import state from '@/store/modules/boat/state';
import { Module } from 'vuex';
import boatApi from './boatApi';
import { BoatState } from './model';

const boat: Module<BoatState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions: actions(boatApi),
};

export default boat;
