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

interface TripCardProps {
  trip: Trip;
  isLoaded: boolean;
  clickable?: boolean;
}

export default function TripCard({
  trip,
  isLoaded,
  clickable = true,
}: TripCardProps) {
  const [cookies, setCookies] = useCookies();

  return (
    <Skeleton isLoaded={isLoaded} className="rounded-lg overflow-visible">
      <Link href={`/reservation`} className="overflow-visible">
        <Card
          className="p-2"
          key={trip.id}
          id={"tripCard" + trip.id}
          isPressable={clickable && trip.freeSeats > 0}
          isDisabled={trip.freeSeats === 0}
          onClick={
            clickable
              ? () => {
                  setCookies("trip", trip.id.toString(), { path: "/" });
                }
              : undefined
          }
        >
          <CardHeader className="flex flex-col justify-start items-start space-x-80">
            <div className="flex justify-between space-x-4 self-center items-center">
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
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-2">
              <div className="flex flex-row gap-2 items-center">
                <MaterialSymbol icon="near_me" size={20} />
                <p>{trip.departure.name}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MaterialSymbol icon="payments" size={20} />
                <p>
                  {trip.price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: (cookies.currency as string) || "EUR",
                  })}
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MaterialSymbol icon="pin_drop" size={20} />
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
    </Skeleton>
  );
}
