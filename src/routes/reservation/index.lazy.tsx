import { NavbarClient } from "@/components/navbar";
import SeatButton from "@/components/seatButton";
import TripCard from "@/components/tripcard";
import { dummyLayout } from "@/dummy/seats";
import { createReservation } from "@/service/reservationService";
import { getTrip } from "@/service/tripService";
import { Row, Trip } from "@/types/trip";
import { Button, Chip } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "@/types/user.ts";
import { MaterialSymbol } from "react-material-symbols";

export const Route = createLazyFileRoute("/reservation/")({
  component: Index,
});

function Index() {
  const router = useNavigate();
  const [cookies, setCookie] = useCookies(["trip", "reservation", "user"]);
  const tripId: number = parseInt(cookies.trip as string);
  const user = cookies.user as User | undefined;
  const [layout, setLayout] = useState<Row[]>(dummyLayout);
  const seats = layout.reduce(
    (acc, row) =>
      acc +
      row.seats.reduce(
        (acc, seat) =>
          seat.enabled && !seat.alreadyReserved ? acc + 1 : acc,
        0,
      ),
    0,
  );

  const { isPending, data: trip } = useQuery<Trip>({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
  });

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: (reservation) => {
      setCookie("reservation", reservation.id, { path: "/" });
      void router({ to: "/reservation/success" });
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Book reservation
        </h1>

        {!isPending && trip && (
          <TripCard trip={trip} isLoaded={!isPending} clickable={true} />
        )}

        <p>Choose up to {trip?.freeSeats} places</p>

        <div className="flex flex-col gap-2">
          {layout.map((row) => (
            <div key={row.id} className="flex flex-row justify-end gap-2">
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

        {user ? (
          <>
            {mutation.isError && (
              <Chip
                color="danger"
                variant={"flat"}
                startContent={<MaterialSymbol icon="error" size={20} />}
              >
                {mutation.error.message}
              </Chip>
            )}
            <Button
              color="primary"
              isDisabled={seats === 0 || seats > trip.freeSeats}
              onClick={() => {
                void mutation.mutateAsync({
                  reservation: {
                    trip: { id: tripId },
                    user: { id: user.id },
                    seats: seats,
                  },
                  jwt: user?.token,
                });
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Chip
            color="danger"
            variant={"flat"}
            startContent={<MaterialSymbol icon="error" size={20} />}
          >
            You&apos;re currently not signed in. Do it first to create a
            reservation.
          </Chip>
        )}
      </div>
    </div>
  );
}
