import actions from '@/store/modules/boat/actions';

describe('Test of actions of boat module', () => {
  const mock = jest.fn();
  const commit = jest.fn();
  const api = {
    getAllBoats: jest.fn(),
    getDetailBoatById: jest.fn(),
    createBoat: jest.fn(),
    updateBoat: jest.fn(),
    deleteBoatById: jest.fn(),
  };
  const actionsMockedApi = actions(api);

  test('should get list of boat from api, when call fetchAllBoats action', async () => {
    await actionsMockedApi.fetchAllBoats({ commit } as any);

    expect(api.getAllBoats).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('initBoats', undefined);
  });

  test('should get boat detail from api, when call fetchDetailBoatById action', async () => {
    await actionsMockedApi.fetchDetailBoatById({ commit } as any, 1);

    expect(api.getDetailBoatById).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('saveBoat', undefined);
  });

  test('should create a boat , when call CreateBoat action then store boat', async () => {
    await actionsMockedApi.createBoat({ commit } as any, {} as any);

    expect(api.createBoat).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('saveBoat', {} as any);
  });
  test('should update a boat , when call updateBoat action then store boat', async () => {
    await actionsMockedApi.updateBoat({ commit } as any, {} as any);

    expect(api.updateBoat).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('saveBoat', undefined);
  });
  test('should delete boat  , when call deleteBoatById action', async () => {
    await actionsMockedApi.deleteBoatById({ commit } as any, 1);

    expect(api.deleteBoatById).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('deleteBoat', 1);
  });
});
