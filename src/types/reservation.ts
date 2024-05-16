import { Trip, TripReference } from "./trip";
import { User, UserReference } from "./user";

export interface Reservation {
  id: number;
  seats: number;
  trip: Trip;
  user: User;
}

export interface Seat {
  id: string;
  isEnabled: boolean;
  isAlreadyReserved: boolean;
}

export interface Row {
  id: number;
  seats: Seat[];
}

export type ReservationCreate = Omit<Reservation, "id" | "trip" | "user"> & {
  trip: TripReference;
  user: UserReference;
};
