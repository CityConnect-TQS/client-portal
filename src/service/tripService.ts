import { Trip, TripSearchParameters } from "@/types/trip";
import { BASE_API_URL } from "./config";
import { CurrencyParams } from "@/types/currency";

export const getTrips = async (
  params?: TripSearchParameters
): Promise<Trip[]> => {
  const res = await fetch(
    BASE_API_URL +
      "trip?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  data.forEach((trip: Trip) => {
    trip.departureTime = new Date(trip.departureTime);
    trip.arrivalTime = new Date(trip.arrivalTime);
  });
  return data;
};

export const getTrip = async (
  id: number,
  params?: CurrencyParams
): Promise<Trip> => {
  const res = await fetch(
    BASE_API_URL +
      "trip/" +
      id +
      "?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  data.departureTime = new Date(data.departureTime);
  data.arrivalTime = new Date(data.arrivalTime);
  return data;
};
