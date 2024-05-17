import { Reservation, ReservationCreate } from "@/types/reservation";
import { BASE_API_URL } from "./config";
import { CurrencyParams } from "@/types/currency";

export const createReservation = async ({
  reservation,
  jwt,
}: {
  reservation: ReservationCreate;
  jwt: string;
}): Promise<Reservation> =>
  fetch(BASE_API_URL + "reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(reservation),
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("No seats available. Refresh the page.");
    }
    return res.json() as Promise<Reservation>;
  });

export const getReservation = async (
  id: number,
  jwt: string,
  params?: CurrencyParams,
): Promise<Reservation> => {
  const res = await fetch(
    BASE_API_URL +
      "reservation/" +
      id +
      "?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const data = (await res.json()) as Reservation;
  data.trip.departureTime = new Date(data.trip.departureTime);
  data.trip.arrivalTime = new Date(data.trip.arrivalTime);

  return data;
};

export const getReservations = async (
  jwt: string,
  params?: CurrencyParams,
): Promise<Reservation[]> => {
  const res = await fetch(
    BASE_API_URL +
      "backoffice/reservation?" +
      new URLSearchParams(params as Record<string, string>),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const data = (await res.json()) as Reservation[];
  data.forEach((reservation) => {
    reservation.trip.departureTime = new Date(reservation.trip.departureTime);
    reservation.trip.arrivalTime = new Date(reservation.trip.arrivalTime);
  });

  return data;
}


export const deleteReservation = async (
  id: number,
  jwt: string,
): Promise<boolean> =>
  fetch(BASE_API_URL + "reservation/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  }).then((res) => res.status === 200);
