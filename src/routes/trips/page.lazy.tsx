import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { City } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/service/cityService";
// import { Trip } from "@/types/trip";
// import { getTrips } from "@/service/tripService";
import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { NavbarClient } from "@/components/navbar";
// import TripCard from "@/components/tripcard";
import { TripSearchContext } from "@/utils/tripsContext";

export const Route = createLazyFileRoute("/trips/page")({
  component: Trips,
});

export default function Trips() {
  // const [departureValue, setDepartureValue] = useState<number>(0);
  // const [arrivalValue, setArrivalValue] = useState<number>(0);
  const [seatsValue, setSeatsValue] = useState<number>(1);
  // const [currency] = useState<string>("EUR");
  // const [departureTimeValue, setDepartureTimeValue] = useState<string>('');

  const { isPending: isCitiesPending, data: cities } =
    useQuery<City[]>({
      queryKey: ["cities"],
      queryFn: () => getCities(),
    }) || [];

  // const { isPending: isTripsPending, data: trips } = null;
    // useQuery<Trip[]>({
    //   // queryKey: [
    //   //   "trips",
    //   //   { departure: departureValue, arrival: arrivalValue, seats: seatsValue, departureTime: departureTimeValue, currency },
    //   // ],
    //   queryFn: () =>
    //     getTrips({
    //       departure: departureValue,
    //       arrival: arrivalValue,
    //       seats: seatsValue,
    //       departureTime: departureTimeValue + "T00:00:00"
    //     }),
    // }) || [];

  return (
    <TripSearchContext.Consumer>
      {(contextValue) => {
        console.log(contextValue.arrival, contextValue.departure, contextValue.departureTime);
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
                      defaultSelectedKey={contextValue.departure}
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
                      defaultSelectedKey={contextValue.arrival}
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
                    defaultValue={seatsValue.toString()}
                    onValueChange={(value) => {
                      setSeatsValue(value ? parseInt(value.toString()) : 0);
                    }}
                  />
                  <Input
                    type="date"
                    label="Date"
                    id="departureTimeInput"
                    className="max-w-xs"
                    defaultValue={contextValue.departureTime}
                  />
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 lg:px-16 gap-8">
              {trips?.map((trip) => (
                <TripCard
                  key={trip.id}
                  isLoaded={!isTripsPending}
                  trip={trip}
                />
              ))}
            </div> */}
          </div>
        );
      }}
    </TripSearchContext.Consumer>
  );
}
