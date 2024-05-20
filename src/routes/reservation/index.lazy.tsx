import { NavbarClient } from "@/components/navbar";
import SeatButton from "@/components/seatButton";
import TripCard from "@/components/tripcard";
import { createReservation } from "@/service/reservationService";
import { getTrip } from "@/service/tripService";
import { Row, TripWithSeats } from "@/types/trip";
import { Button, Chip, CircularProgress } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import { User } from "@/types/user.ts";
import { MaterialSymbol } from "react-material-symbols";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/reservation/")({
  component: Index,
});

function Index() {
  const router = useNavigate();
  const [cookies, setCookie] = useCookies(["trip", "reservation", "user"]);
  const tripId: number = parseInt(cookies.trip as string);
  const user = cookies.user as User | undefined;
  const [layout, setLayout] = useState<Row[]>([]);
  const reserved = layout.flatMap((row) =>
    row.seats.filter((seat) => seat.enabled).map((seat) => seat.id + row.id),
  );

  const { isPending, data: trip } = useQuery<TripWithSeats>({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
  });

  useEffect(() => {
    if (!isPending) {
      setLayout(trip!.seatsMap);
    }
  }, [isPending, trip]);

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
        <h1 id="pageTitle" className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Book reservation
        </h1>

        {isPending ? (
          <div>
            <CircularProgress />
            <p>Fetching trip...</p>
          </div>
        ) : (
          <>
            {trip && (
              <TripCard trip={trip} isLoaded={!isPending} clickable={true} />
            )}

            <p>Choose up to {trip?.freeSeats} places</p>

            <div className="flex flex-col gap-2">
              {layout.map((row) => (
                <div key={row.id} className="flex flex-row justify-end gap-2">
                  {row.seats.map((seat) => (
                    <SeatButton
                      key={"seat" + seat.id + row.id}
                      row={row}
                      seat={seat}
                      setLayout={setLayout}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

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
              isDisabled={
                reserved.length === 0 ||
                reserved.length > (trip?.freeSeats ?? 0)
              }
              id={"submitBtn"}
              onClick={() => {
                void mutation.mutateAsync({
                  reservation: {
                    trip: { id: tripId },
                    user: { id: user.id },
                    seats: reserved,
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
            id={"notSignedInChip"}
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
