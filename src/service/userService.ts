import { User, UserCreate, UserLogin } from "@/types/user";
import { BASE_API_URL } from "./config";
import { Reservation } from "@/types/reservation";

export const createUser = async (user: UserCreate): Promise<User> =>
  fetch(BASE_API_URL + "user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("User already exists");
    }
    return res.json() as Promise<User>;
  });

export const loginUser = async (user: UserLogin): Promise<User> =>
  fetch(BASE_API_URL + "user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Invalid credentials");
    }
    return res.json() as Promise<User>;
  });

export const getUserReservations = async (
  id: number,
  jwt: string
): Promise<Reservation[]> => {
  const res = await fetch(BASE_API_URL + "user/" + id + "/reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const data = (await res.json()) as Reservation[];
  data.forEach((reservation: Reservation) => {
    reservation.trip.departureTime = new Date(reservation.trip.departureTime);
    reservation.trip.arrivalTime = new Date(reservation.trip.arrivalTime);
  });
  return data;
};

export const updateUser = async (
  id: number,
  user: UserCreate,
  jwt: string
): Promise<User> =>
  fetch(BASE_API_URL + "user/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(user),
  }).then((res) => res.json() as Promise<User>);

export const deleteUser = async (id: number, jwt: string): Promise<boolean> =>
  fetch(BASE_API_URL + "user/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  }).then((res) => res.status === 200);
