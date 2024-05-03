/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Trip } from "@/types/trip";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { MaterialSymbol } from "react-material-symbols";
import { useCookies } from "react-cookie";

type TripCardProps = {
  trip: Trip;
  isLoaded: boolean;
  clickable?: boolean;
};

export default function TripCard({
  trip,
  isLoaded,
  clickable = true,
}: TripCardProps) {
  const [cookies] = useCookies();

  return isLoaded ? (
    <Link href={`/trip/reservation`}>
      <Card
        key={trip.id}
        id={"tripCard" + trip.id}
        isPressable={clickable && trip.freeSeats > 0}
        isDisabled={trip.freeSeats === 0}
        onClick={
          clickable
            ? () => {
                cookies.set("trip", trip.id.toString());
              }
            : undefined
        }
      >
        <CardHeader className="flex flex-col justify-start items-start">
          <p className="text-lg font-bold">
            {trip.departureTime.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <p className="text-small text-default-500">
            Arrival at{" "}
            {trip.arrivalTime.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2">
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="flight_takeoff" size={20} />
              <p>{trip.departure.name}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="payments" size={20} />
              <p>
                {trip.price.toLocaleString("pt-PT", {
                  style: "currency",
                  currency: cookies.get("currency") || "EUR",
                })}
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="flight_land" size={20} />
              <p>{trip.arrival.name}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="directions_bus" size={20} />
              <p>{trip.bus.capacity}-seat bus</p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          {trip.freeSeats === 0 ? "No" : trip.freeSeats} seats available
        </CardFooter>
      </Card>
    </Link>
  ) : (
    <Link href={`/trip/reservation`}>
      <Card>
        <CardHeader className="flex flex-col justify-start items-start">
          <Skeleton className="rounded">
            <p className="text-lg font-bold">Departure time</p>
          </Skeleton>
          <Skeleton className="rounded">
            <p className="text-small text-default-500">Arrival time</p>
          </Skeleton>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2">
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="flight_takeoff" size={20} />
              <Skeleton className="rounded">
                <p>Departure</p>
              </Skeleton>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="payments" size={20} />
              <Skeleton className="rounded">
                <p>Price</p>
              </Skeleton>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="flight_land" size={20} />
              <Skeleton className="rounded">
                <p>Arrival</p>
              </Skeleton>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MaterialSymbol icon="directions_bus" size={20} />
              <Skeleton className="rounded">
                <p>Capacity</p>
              </Skeleton>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Skeleton className="rounded">
            <p>0 seats available</p>
          </Skeleton>
        </CardFooter>
      </Card>
    </Link>
  );
}