import { NavbarClient } from "@/components/navbar";
import TripCard from "@/components/tripcard";
import { getUserReservations } from "@/service/userService";
import { Reservation } from "@/types/reservation";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";

export const Route = createLazyFileRoute("/reservation/myreservations")({
  component: MyReservations,
});

function MyReservations() {
  const [cookies] = useCookies(["reservation", "user"]);
  const reservationId: number = parseInt(cookies.reservation as string);
  const user = cookies.user as User;

  const { isPending, data: reservations } = useQuery<Reservation[]>({
    queryKey: ["reservation", reservationId, user?.token, user.id],
    queryFn: async () => {
    const reservations = await getUserReservations(user.id, user?.token);
      return reservations;
    },
  });

  console.log(user?.token);

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance">
        Your Bookings
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {reservations?.map((reservation) => (
            <TripCard
              key={reservation.id}
              trip={reservation.trip}
              isLoaded={!isPending}
              clickable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
