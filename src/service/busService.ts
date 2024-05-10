import { Bus } from "@/types/bus";
import { BASE_API_URL } from "./config";

export const getBuses = async (): Promise<Bus[]> =>
  fetch(BASE_API_URL + "bus", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<Bus[]>);

export const getBus = async (id: number): Promise<Bus> =>
  fetch(BASE_API_URL + "bus/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<Bus>);

  
