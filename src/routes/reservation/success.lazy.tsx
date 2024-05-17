import { NavbarClient } from "@/components/navbar";
import TripCard from "@/components/tripcard";
import { getReservation } from "@/service/reservationService";
import { Reservation } from "@/types/reservation";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import { User } from "@/types/user.ts";

export const Route = createLazyFileRoute("/reservation/success")({
  component: Success,
});

function Success() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["reservation", "user"]);
  const reservationId: number = parseInt(cookies.reservation as string);
  const user = cookies.user as User | undefined;

  if (user === undefined) {
    void navigate({ to: "/" });
  }

  const { isPending, data: reservation } = useQuery<Reservation>({
    queryKey: ["reservation", reservationId, user?.token],
    queryFn: () => getReservation(reservationId, user?.token ?? ""),
  });

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
          Book confirmation
        </h1>

        <div className="flex flex-col gap-2 justify-center items-center">
          <p id={"confirmText"}>
            Your trip is booked! The reservation ID is {reservation?.id} and you
            booked {reservation?.seats?.length} seat
            {reservation?.seats?.length !== 1 && "s"}:
          </p>

          <p className={"font-bold"}>
            {Array.from(reservation?.seats ?? []).join(", ")}
          </p>
        </div>

        {!isPending && (
          <TripCard
            trip={reservation!.trip}
            isLoaded={!isPending}
            clickable={true}
          />
        )}
      </div>
    </div>
  );
}
