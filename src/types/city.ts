export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export type CityCreate = Omit<City, "id">;

export type CityReference = Pick<City, "id">;
