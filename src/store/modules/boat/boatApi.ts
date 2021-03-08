import http from '@/services/http';
import { Boat, BoatDetail } from './model';

export default {
  async getAllBoats(): Promise<Boat[]> {
    const response = await http().get('/boats');
    return response.data;
  },

  async getDetailBoatById(id: number): Promise<BoatDetail> {
    const response = await http().get(`/boats/${id}`);
    return response.data;
  },

  async createBoat(boat: BoatDetail): Promise<number> {
    const { name, description } = boat;
    const response = await http().post('/boats', { name, description });
    return response.data;
  },

  async updateBoat(boat: BoatDetail): Promise<BoatDetail> {
    const data = { ...boat };
    const response = await http().put(`/boats/${boat.id}`, data);
    return response.data;
  },

  async deleteBoatById(id: number): Promise<void> {
    await http().delete(`/boats/${id}`);
  },
};
