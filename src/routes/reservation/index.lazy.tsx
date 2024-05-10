import { NavbarClient } from "@/components/navbar";
import SeatButton from "@/components/seatButton";
import TripCard from "@/components/tripcard";
import { dummyLayout } from "@/dummy/seats";
import { createReservation } from "@/service/reservationService";
import { getTrip } from "@/service/tripService";
import { Row } from "@/types/reservation";
import { Trip } from "@/types/trip";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const Route = createLazyFileRoute("/reservation/")({
  component: Index,
});

function Index() {
  const router = useNavigate();
  const [cookies, setCookie] = useCookies(["trip", "reservation"]);
  const tripId: number = parseInt(cookies.trip as string);
  const [layout, setLayout] = useState<Row[]>(dummyLayout);
  const seats = layout.reduce(
    (acc, row) =>
      acc +
      row.seats.reduce(
        (acc, seat) =>
          seat.isEnabled && !seat.isAlreadyReserved ? acc + 1 : acc,
        0
      ),
    0
  );

  const { isPending: isPending, data: trip } = useQuery<Trip>({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
    initialData: {
      id: 0,
      departure: {
        id: 0,
        name: "",
        latitude: 0,
        longitude: 0,
      },
      departureTime: new Date(),
      arrival: {
        id: 0,
        name: "",
        latitude: 0,
        longitude: 0,
      },
      arrivalTime: new Date(),
      bus: {
        id: 0,
        company: "",
        capacity: 0,
      },
      freeSeats: 0,
      price: 0,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Book reservation
        </h1>

        {!isPending && (
          <TripCard trip={trip} isLoaded={!isPending} clickable={true} />
        )}

        <p>Choose up to {trip.freeSeats} places</p>

        <div className="flex flex-col gap-2">
          {layout.map((row) => (
            <div key={row.id} className="flex flex-row gap-2">
              {row.seats.map((seat) => (
                <SeatButton
                  key={seat.id}
                  row={row}
                  seat={seat}
                  setLayout={setLayout}
                />
              ))}
            </div>
          ))}
        </div>

        <Button
          color="primary"
          isDisabled={seats === 0 || seats > trip.freeSeats}
          onClick={() => {
            createReservation({
              trip: { id: tripId },
              user: { id: 1 },
              seats: seats,
            })
              .then((reservation) => {
                setCookie("reservation", reservation.id, { path: "/" });
                void router({ to: "/reservation/success" });
              })
              .catch(() => {
                // TODO: Refactor this to use a toast
                alert("Error creating reservation.");
              });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
