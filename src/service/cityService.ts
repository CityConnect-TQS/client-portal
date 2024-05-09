import { City, CityCreate } from "@/types/city";
import { BASE_API_URL } from "./config";

export const getCities = async (name?: string): Promise<City[]> =>
  fetch(
    BASE_API_URL +
      "city" +
      (typeof name !== "undefined" ? "?name=" + name : ""),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

export const getCity = async (id: number): Promise<City> =>
  fetch(BASE_API_URL + "city/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
