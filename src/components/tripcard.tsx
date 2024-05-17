import { Trip } from "@/types/trip";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { useCookies } from "react-cookie";
import TripCardProp from "@/components/tripCardProp.tsx";

interface TripCardProps {
  trip: Trip;
  isLoaded: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export default function TripCard({
  trip,
  isLoaded,
  clickable = true,
  onClick,
}: TripCardProps) {
  const [cookies] = useCookies(["currency"]);

  return (
    <Card
      className="p-2"
      key={trip.id}
      id={"tripCard" + trip.id}
      isPressable={clickable && trip.freeSeats > 0}
      isDisabled={trip.freeSeats === 0}
      onClick={onClick}
    >
      <CardHeader className="flex justify-between gap-8 items-center">
        <Skeleton isLoaded={isLoaded} className={"rounded"}>
          <p className="text-lg font-bold">
            {isLoaded
              ? trip.departureTime.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : ""}
          </p>
        </Skeleton>
        <p className="text-small text-default-500">
          Arrival at{" "}
          {trip.arrivalTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-2">
        <TripCardProp icon={"near_me"} title={trip.departure.name} />
        <TripCardProp
          icon={"payments"}
          title={trip.price.toLocaleString("pt-PT", {
            style: "currency",
            currency: (cookies.currency as string) || "EUR",
          })}
        />
        <TripCardProp icon={"pin_drop"} title={trip.arrival.name} />
        <TripCardProp
          icon={"directions_bus"}
          title={trip.bus.capacity + "-seat bus"}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        {trip.freeSeats === 0 ? "No" : trip.freeSeats} seats available
      </CardFooter>
    </Card>
  );
}
