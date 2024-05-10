import { NavbarClient } from "@/components/navbar";
import TripCard from "@/components/tripcard";
import { getReservation } from "@/service/reservationService";
import { getTrip } from "@/service/tripService";
import { Reservation } from "@/types/reservation";
import { Trip } from "@/types/trip";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";

export const Route = createLazyFileRoute("/reservation/success")({
  component: Success,
});

function Success() {
  const [cookies, setCookie] = useCookies(["reservation"]);
  const reservationId: number = parseInt(cookies.reservation as string);

  const { isPending: isPending, data: reservation } = useQuery<Reservation>({
    queryKey: ["reservation", reservationId],
    queryFn: () => getReservation(reservationId),
  });

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Book confirmation
        </h1>

        <p>
          Your trip is booked! The reservation ID is {reservation?.id} and you
          booked {reservation?.seats} seat{reservation?.seats !== 1 && "s"}.
        </p>

        {!isPending && (
          <TripCard
            trip={reservation?.trip}
            isLoaded={!isPending}
            clickable={true}
          />
        )}
      </div>
    </div>
  );
}
