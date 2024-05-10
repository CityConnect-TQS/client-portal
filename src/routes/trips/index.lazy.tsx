import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { City } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/service/cityService";
import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { NavbarClient } from "@/components/navbar";
import { getTrips } from "@/service/tripService";
import TripCard from "@/components/tripcard";
import { Currency } from "@/types/currency";
import { Trip } from "@/types/trip";
import { useCookies } from "react-cookie";

interface TripInfo {
  departure: number;
  arrival: number;
  departureTime: string;
}

export const Route = createFileRoute("/trips/")({
  validateSearch: (search: Record<string, unknown>): TripInfo => {
    return {
      departure: search.departure as number,
      arrival: search.arrival as number,
      departureTime: search.departureTime as string,
    };
  },
  component: Trips,
});

export default function Trips() {
  const navigate = useNavigate();
  const { departure, arrival, departureTime } = Route.useSearch();
  const areParametersValid =
    departure !== undefined &&
    arrival !== undefined &&
    departureTime !== undefined;

  if (!areParametersValid) {
    const stateTemp = {
      arrival: arrival,
      departure: departure,
      departureTime: departureTime,
    };

    if (departure === undefined) {
      stateTemp.departure = 1;
    }
    if (arrival === undefined) {
      stateTemp.arrival = 2;
    }
    if (departureTime === undefined) {
      stateTemp.departureTime = new Date().toISOString().split("T")[0];
    }

    void navigate({ search: stateTemp, replace: true });
  }

  const [cookies, setCookies] = useCookies(["currency", "trip"]);
  const currency = (cookies.currency as Currency) ?? "EUR";
  const [seats, setSeats] = useState<number>(1);
  const [state, setState] = useState({
    arrival: arrival,
    departure: departure,
    departureTime: departureTime,
  });

  const updateParameters = () => {
    void navigate({ search: state, replace: true });
  };

  const setArrival = (value: number) =>
    setState((prevState) => ({ ...prevState, arrival: value }));
  const setDeparture = (value: number) =>
    setState((prevState) => ({ ...prevState, departure: value }));
  const setDepartureTime = (value: string) =>
    setState((prevState) => ({ ...prevState, departureTime: value }));

  const { isPending: isCitiesPending, data: cities } =
    useQuery<City[]>({
      queryKey: ["cities"],
      queryFn: () => getCities(),
    }) || [];

  const { isPending: isTripsPending, data: trips } =
    useQuery<Trip[]>({
      queryKey: [
        "trips",
        { departure, arrival, seats, departureTime, currency },
      ],
      queryFn: () =>
        getTrips({
          arrival,
          departure,
          seats,
          departureTime: departureTime.substring(0, 10) + "T00:00:00",
        }),
    }) || [];

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Available trips
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton isLoaded={!isCitiesPending} className="rounded-lg">
              <Autocomplete
                label="Departure"
                id="departure"
                className="max-w-xs"
                defaultSelectedKey={departure.toString()}
                onSelectionChange={(value) => {
                  setDeparture(value ? parseInt(value.toString()) : 0);
                  setArrival(arrival);
                  setDepartureTime(departureTime);
                }}
              >
                {cities
                  ? cities.map((city: City) => (
                      <AutocompleteItem
                        key={city.id}
                        value={city.id}
                        id={"departure" + city.id}
                      >
                        {city.name}
                      </AutocompleteItem>
                    ))
                  : []}
              </Autocomplete>
            </Skeleton>
            <Skeleton isLoaded={!isCitiesPending} className="rounded-lg">
              <Autocomplete
                label="Arrival"
                id="arrival"
                className="max-w-xs"
                defaultSelectedKey={arrival.toString()}
                onSelectionChange={(value) => {
                  setArrival(value ? parseInt(value.toString()) : 0);
                  setDeparture(departure);
                  setDepartureTime(departureTime);
                }}
              >
                {cities
                  ? cities.map((city) => (
                      <AutocompleteItem
                        key={city.id}
                        value={city.id}
                        id={"arrival" + city.id}
                      >
                        {city.name}
                      </AutocompleteItem>
                    ))
                  : []}
              </Autocomplete>
            </Skeleton>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="number"
              label="People"
              id="seatsInput"
              min={1}
              className="w-full lg:max-w-24"
              defaultValue={seats.toString()}
              onValueChange={(value) => {
                setSeats(value ? parseInt(value.toString()) : 0);
                setArrival(arrival);
                setDeparture(departure);
                setDepartureTime(departureTime);
              }}
            />
            <Input
              type="date"
              label="Date"
              id="departureTimeInput"
              className="max-w-xs"
              onValueChange={(value) => {
                setDepartureTime(value.toString());
                setArrival(arrival);
                setDeparture(departure);
              }}
              defaultValue={
                departureTime
                  ? new Date(departureTime).toISOString().split("T")[0]
                  : undefined
              }
            />
            <Button
              color="primary"
              size="lg"
              className="h-14 w-full"
              onClick={updateParameters}
            >
              Search
            </Button>
          </div>
        </div>
        {isTripsPending ? (
          <div className="flex flex-col gap-4 items-center pt-16">
            <Spinner />
            <p>Loading trips...</p>
          </div>
        ) : (
          <div className="flex justify-around pb-16 pt-16">
            {trips?.length !== 0 ? (
              <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-y-16 md:px-8 gap-12">
                {trips?.map((trip) => (
                  <TripCard
                    key={trip.id}
                    isLoaded={!isTripsPending}
                    trip={trip}
                    onClick={() => {
                      setCookies("trip", trip.id.toString(), { path: "/" });
                      void navigate({
                        to: "/reservation",
                      });
                    }}
                  />
                ))}
              </div>
            ) : (
              <h1 className="text-3xl font-bold pt-32 text-center items-center">
                No trips available for this date
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
