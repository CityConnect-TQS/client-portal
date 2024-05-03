import { DatePicker, Select, SelectItem, Button } from "@nextui-org/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { parseAbsoluteToLocal } from "@internationalized/date";
import React from "react";
import { NavbarClient } from "@/components/navbar";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

// eslint-disable-next-line react-refresh/only-export-components
export const staticCities = [
  { value: "1", label: "Aveiro" },
  { value: "2", label: "Ovar" },
  { value: "3", label: "Castelo Branco" },
  { value: "4", label: "Fortaleza" },
];

function Index() {
  const [date, setDate] = React.useState(new Date());
  const formattedDate = date.toISOString();

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
            <Select
              items={staticCities}
              label="From"
              placeholder="Origin"
              className="max-w-xs"
              isRequired
            >
              {(cities) => (
                <SelectItem key={cities.value}>{cities.label}</SelectItem>
              )}
            </Select>
            <Select
              items={staticCities}
              label="To"
              placeholder="Destination"
              className="max-w-xs"
              isRequired
            >
              {(cities) => (
                <SelectItem key={cities.value}>{cities.label}</SelectItem>
              )}
            </Select>
            <DatePicker
              label="Departure"
              className="max-w-xs"
              granularity="day"
              value={parseAbsoluteToLocal(formattedDate)}
              onChange={(date) => setDate(date.toDate())}
              isRequired
            />
            <Button color="primary" size="lg" className="h-14">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
