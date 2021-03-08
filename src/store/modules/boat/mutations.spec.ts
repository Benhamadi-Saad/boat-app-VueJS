import mutations from './mutations';

describe('Test of mutations of boat module', () => {
  test('should init list of boat, when call initBoats mutation', () => {
    const state = {
      boats: [],
    };
    mutations.initBoats(state, [{ id: 1, name: 'name', description: 'description' }]);
    expect(state.boats).toEqual(expect.arrayContaining([{ id: 1, name: 'name', description: 'description' }]));
  });
  test('should update existing boat, when call saveBoat mutation', () => {
    const state = {
      boats: [{ id: 1, name: 'name', description: 'description' }],
    };
    mutations.saveBoat(state, { id: 1, name: 'name2', description: 'description2' });
    expect(state.boats).toEqual(expect.arrayContaining([{ id: 1, name: 'name2', description: 'description2' }]));
  });
  test('should save new boat, when call saveBoat mutation ', () => {
    const state = {
      boats: [{ id: 1, name: 'name', description: 'description' }],
    };
    mutations.saveBoat(state, { id: 2, name: 'name2', description: 'description2' });
    expect(state.boats).toEqual(expect.arrayContaining([{ id: 1, name: 'name', description: 'description' }, { id: 2, name: 'name2', description: 'description2' }]));
  });
  test('should delete boat, when call deleteBoat mutation', () => {
    const state = {
      boats: [{ id: 1, name: 'name', description: 'description' }],
    };
    mutations.deleteBoat(state, 1);
    expect(state.boats).toEqual([]);
  });
});
