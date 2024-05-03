/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  DatePicker,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { parseAbsoluteToLocal } from "@internationalized/date";
import React, { createContext, useState } from "react";
import { NavbarClient } from "@/components/navbar";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/types/city";
import { getCities } from "@/service/cityService";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

type a = {
  departure: number;
  setDeparture: (id: number) => void;
  arrival: number;
  departureTime: string;
};

export const TripSearchContext = createContext<a>({
  departure: 0,
  setDeparture: () => {},
  arrival: 0,
  departureTime: "",
});

export const staticCities = [
  { value: "1", label: "Aveiro" },
  { value: "2", label: "Ovar" },
  { value: "3", label: "Castelo Branco" },
  { value: "4", label: "Fortaleza" },
];

function Index() {
  const [date, setDate] = React.useState(new Date());
  const formattedDate = date.toISOString();
  const [cookies] = useCookies();

  const [departure, setDeparture] = useState<number>(0);
  const [arrival, setArrival] = useState<number>(0);
  // const [departureTime, setDepartureTime] = useState<string>("");

  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => getCities(),
  });

  return (
    <div className="p-2 h-screen flex flex-col">
      <NavbarClient />
      <div className="flex justify-center items-center flex-grow">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-center">
            Welcome to CityConnect
          </h1>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Your endless journeys start here.
          </h2>
          <div className="flex flex-col items-center w-full space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 text-center">
            <Autocomplete
              label="From"
              id="origin"
              className="max-w-xs"
              onSelectionChange={(id) =>
                setDeparture(id ? parseInt(id.toString()) : 0)
              }
            >
              {cities
                ? cities.map((city: City) => (
                    <AutocompleteItem
                      key={city.id}
                      value={city.name}
                      id={"departure" + city.id}
                    >
                      {city.name}
                    </AutocompleteItem>
                  ))
                : []}
            </Autocomplete>
            <Autocomplete
              label="To"
              id="destination"
              className="max-w-xs"
              onSelectionChange={(id) =>
                setArrival(id ? parseInt(id.toString()) : 0)
              }
            >
              {cities
                ? cities.map((city) => (
                    <AutocompleteItem
                      key={city.id}
                      value={city.name}
                      id={"arrival" + city.id}
                    >
                      {city.name}
                    </AutocompleteItem>
                  ))
                : []}
            </Autocomplete>
            <DatePicker
              label="Departure"
              className="max-w-xs"
              granularity="day"
              value={parseAbsoluteToLocal(formattedDate)}
              onChange={(date) => setDate(date.toDate())}
              isRequired
            />
            <Button
              color="primary"
              size="lg"
              className="h-14"
              onClick={() => {
                cookies.set("departure", departure.toString());
                cookies.set("arrival", arrival.toString());
                cookies.set("departureTime", formattedDate);
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
