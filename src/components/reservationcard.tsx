import { Trip } from "@/types/trip";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { useCookies } from "react-cookie";
import TripCardProp from "@/components/tripCardProp.tsx";
import { MaterialSymbol } from "react-material-symbols";

interface ReservationCardProps {
  trip: Trip;
  isLoaded: boolean;
  onCancel: () => void;
  onCheckIn: () => void;
  checkIn: boolean;
}

export default function ReservationCard({
  trip,
  isLoaded,
  onCancel,
  onCheckIn,
  checkIn,
}: Readonly<ReservationCardProps>) {
  const [cookies] = useCookies(["currency"]);

  return (
    <Card className="p-2" key={trip.id} id={"tripCard" + trip.id}>
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
      <CardFooter className="flex justify-between">
        <Button color="danger" onClick={onCancel}>
          Cancel trip
        </Button>
        {checkIn ? (
          <Chip
            color="success"
            variant="flat"
            size="lg"
            startContent={<MaterialSymbol icon={"check"} size={24} />}
            id={"checkInChip"}
          >
            Checked-in
          </Chip>
        ) : (
          <Button color="primary" onClick={onCheckIn} id="docheckin">
            Check-in
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
