import {
  DatePicker,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { NavbarClient } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/types/city";
import { getCities } from "@/service/cityService";
import { TripSearchContext } from "@/utils/tripsContext";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { departure, setDeparture, arrival, setArrival, setDepartureTime } =
    useContext(TripSearchContext);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);

  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => getCities(),
  });

  // refactorizar
  useEffect(() => {
    if (departure !== 0 && arrival !== 0) {
      setSearchEnabled(true);
    } else {
      setSearchEnabled(false);
    }
  }, [departure, arrival]);

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
              onSelectionChange={(value) => {
                setDeparture(value ? parseInt(value.toString()) : 0);
              }}
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
              onSelectionChange={(value) => {
                setArrival(value ? parseInt(value.toString()) : 0);
              }}
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
              granularity="day"
              onChange={(date) => setDepartureTime(date.toString())}
            />
            <Link to={"/trips/page"}>
              <Button
                color="primary"
                size="lg"
                className="h-14"
                isDisabled={!searchEnabled}
              >
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
