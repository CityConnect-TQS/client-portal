import { Trip, TripReference } from "./trip";
import { User, UserReference } from "./user";

export interface Reservation {
  id: number;
  seats: string[];
  trip: Trip;
  user: User;
  checkedIn: boolean;
}

export type ReservationCreate = Omit<Reservation, "id" | "trip" | "user"> & {
  trip: TripReference;
  user: UserReference;
};
