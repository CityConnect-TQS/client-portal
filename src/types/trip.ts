import { Bus } from "./bus";
import { City } from "./city";
import { CurrencyParams } from "./currency";

export type TripStatus =
  | "ONTIME"
  | "DELAYED"
  | "DEPARTED"
  | "ONBOARDING"
  | "ARRIVED";

export interface Trip {
  id: number;
  bus: Bus;
  departure: City;
  departureTime: Date;
  arrival: City;
  arrivalTime: Date;
  price: number;
  freeSeats: number;
  status: TripStatus;
  delay: number;
}

export type TripWithSeats = Trip & {
  seatsMap: Row[];
};

export type TripReference = Pick<Trip, "id">;

export type TripSearchParameters = CurrencyParams & {
  departure?: number;
  arrival?: number;
  departureTime?: string;
  seats?: number;
};

export interface Seat {
  id: number;
  enabled?: boolean;
  alreadyReserved: boolean;
}

export interface Row {
  id: string;
  seats: Seat[];
}
