import {
  DatePicker,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { NavbarClient } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/types/city";
import { getCities } from "@/service/cityService";
import { useCookies } from "react-cookie";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const [, setCookie] = useCookies([
    "departure",
    "arrival",
    "departureTime",
    "currency",
  ]);

  const [departure, setDeparture] = useState<number>(0);
  const [arrival, setArrival] = useState<number>(0);
  const [departureTime, setDepartureTime] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const isFormValid = departure !== 0 && arrival !== 0 && departureTime !== "";

  const handleDepartureChange = (value: { toString: () => string }) => {
    const departureId = value ? parseInt(value.toString()) : 0;
    setDeparture(departureId);
  };

  const handleArrivalChange = (value: { toString: () => string }) => {
    const arrivalId = value ? parseInt(value.toString()) : 0;
    setArrival(arrivalId);
  };

  const handleSearch = () => {
    setCookie("departure", departure.toString());
    setCookie("arrival", arrival.toString());
    setCookie("departureTime", departureTime);
    setCookie("currency", "EUR");

    void navigate({
      to: "/trips",
      search: { departure, arrival, departureTime },
    });
  };

  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => getCities(),
  });

  return (
    <div className="h-screen flex flex-col">
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
              onSelectionChange={handleDepartureChange}
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
              onSelectionChange={handleArrivalChange}
            >
              {cities
                ? cities.map((city) => (
                    <AutocompleteItem
                      key={city.id}
                      value={city.name}
                      id={"arrival" + city.id}
                      onChange={() => setArrival(city.id)}
                    >
                      {city.name}
                    </AutocompleteItem>
                  ))
                : []}
            </Autocomplete>
            <DatePicker
              label="Departure"
              className="max-w-xs"
              id="departureTime"
              granularity="day"
              onChange={(date) => setDepartureTime(date.toString())}
            />
            <Button
              color="primary"
              size="lg"
              className="h-14"
              id="searchBtn"
              isDisabled={!isFormValid}
              onClick={handleSearch}
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
