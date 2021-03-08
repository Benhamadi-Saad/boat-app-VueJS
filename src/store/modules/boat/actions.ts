import { RootState } from '@/store/model';
import { ActionContext } from 'vuex';
import boatApi from './boatApi';
import { BoatDetail, BoatState } from './model';

const actions = (api: typeof boatApi) => ({
  async fetchAllBoats({ commit }: ActionContext<BoatState, RootState>): Promise<void> {
    const boats = await api.getAllBoats();
    commit('initBoats', boats);
  },

  async fetchDetailBoatById({ commit }: ActionContext<BoatState, RootState>, id: number): Promise<void> {
    const boatdetail = await api.getDetailBoatById(id);
    commit('saveBoat', boatdetail);
  },

  async createBoat({ commit }: ActionContext<BoatState, RootState>, boatdetail: BoatDetail): Promise<void> {
    const id = await api.createBoat(boatdetail);
    commit('saveBoat', { ...boatdetail, id });
  },

  async updateBoat({ commit }: ActionContext<BoatState, RootState>, boatdetail: BoatDetail): Promise<void> {
    const newBoat = await api.updateBoat(boatdetail);
    commit('saveBoat', newBoat);
  },

  async deleteBoatById({ commit }: ActionContext<BoatState, RootState>, id: number): Promise<void> {
    await api.deleteBoatById(id);
    commit('deleteBoat', id);
  },
});

export default actions;
