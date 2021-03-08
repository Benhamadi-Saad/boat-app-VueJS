import { MutationTree } from 'vuex';
import { BoatDetail, BoatState } from './model';

const mutations: MutationTree<BoatState> = {
  initBoats(state, boats: BoatDetail[]) {
    state.boats = boats;
  },

  saveBoat(state, boatEdited: BoatDetail) {
    const index = state.boats
      .findIndex((boat) => boat.id === boatEdited.id);

    if (index === -1) {
      state.boats.push(boatEdited);
    } else {
      state.boats.splice(index, 1, boatEdited);
    }
  },

  deleteBoat(state, id: number) {
    const omitedBoat = state.boats
      .filter((boat) => boat.id !== id);

    state.boats = [...omitedBoat];
  },
};

export default mutations;
