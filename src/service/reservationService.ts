import { Reservation, ReservationCreate } from "@/types/reservation";
import { BASE_API_URL } from "./config";
import { CurrencyParams } from "@/types/currency";

export const createReservation = async (
  reservation: ReservationCreate,
  params?: CurrencyParams
): Promise<Reservation> =>
  fetch(
    BASE_API_URL +
      "reservation?" +
      new URLSearchParams(params as Record<string, string>),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    }
  ).then((res) => res.json() as Promise<Reservation>);

export const getReservations = async (
  params?: CurrencyParams
): Promise<Reservation[]> =>
  fetch(
    BASE_API_URL +
      "reservation?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json() as Promise<Reservation[]>);

export const getReservation = async (
  id: number,
  params?: CurrencyParams
): Promise<Reservation> =>
  fetch(
    BASE_API_URL +
      "reservation/" +
      id +
      "?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json() as Promise<Reservation>);

export const deleteReservation = async (id: number): Promise<boolean> =>
  fetch(BASE_API_URL + "reservation/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.status === 200);
