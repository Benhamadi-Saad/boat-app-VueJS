export interface BoatState {
  boats: BoatDetail[];
}

export interface Boat {
  id: number | null;
  name: string | null;
}

export interface BoatDetail extends Boat {
  description: string | null;
}
