import { NavbarClient } from "@/components/navbar";
import ReservationCard from "@/components/reservationcard";
import {
  checkInReservation,
  deleteReservation,
} from "@/service/reservationService";
import { getUserReservations } from "@/service/userService";
import { Reservation } from "@/types/reservation";
import { User } from "@/types/user";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import { MaterialSymbol } from "react-material-symbols";

export const Route = createLazyFileRoute("/reservation/myreservations")({
  component: MyReservations,
});

function MyReservations() {
  const [cookies] = useCookies(["reservation", "user"]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const reservationId: number = parseInt(cookies.reservation as string);
  const user = cookies.user as User;

  const { isPending, data: reservations } = useQuery<Reservation[]>({
    queryKey: ["reservation", reservationId, user?.token, user?.id],
    queryFn: async () => {
      const reservations = await getUserReservations(user?.id, user?.token);
      return reservations;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => checkInReservation(reservationId, user?.token),
    onSuccess: () => {
      onOpenChange2();
      void queryClient.invalidateQueries({
        queryKey: ["reservation", reservationId, user?.token, user?.id],
      });
    },
  });

  // passar para mutation
  const deleteReserve = useMutation({
    mutationFn: () => deleteReservation(reservationId, user?.token),
    onSuccess: () => {
      onOpenChange();
      void queryClient.invalidateQueries({
        queryKey: ["reservation", reservationId, user?.token, user?.id],
      });
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <NavbarClient />
      <div className="p-8 lg:p-24 flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl lg:text-5xl text-center text-balance pb-8">
          Your Bookings
        </h1>
        {user ? (
          <>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-16">
              {reservations?.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  trip={reservation.trip}
                  isLoaded={!isPending}
                  onCancel={() => onOpen()}
                  onCheckIn={() => onOpen2()}
                  checkIn={reservation.checkedIn}
                />
              ))}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      WARNING
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        This action is irreversible. Are you sure you want to
                        cancel this reservation?
                      </p>
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                      <Button
                        color="danger"
                        onPress={() => {
                          deleteReserve.mutate();
                        }}
                      >
                        Yes, I&apos;m sure
                      </Button>
                      <Button color="primary" variant="flat" onClick={onOpen} onPress={onOpen}>
                        No, I changed my mind
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Modal isOpen={isOpen2} onOpenChange={onOpenChange}>
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Check in Reservation
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        You&apos;re about to check in this reservation. Click on
                        the button to confirm.
                      </p>
                    </ModalBody>
                    <ModalFooter className="flex justify-between flex-row-reverse">
                      <Button
                        color="primary"
                        onClick={() => {
                          void mutation.mutate();
                        }}
                        onPress={() => {
                          void mutation.mutate();
                        }}
                        id="checkInButton"
                      >
                        Check-in
                      </Button>
                      <Button color="danger" onClick={onOpen} onPress={onOpen}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          <Chip
            color="danger"
            variant={"flat"}
            id={"notSignedInChip"}
            startContent={<MaterialSymbol icon="error" size={20} />}
          >
            You&apos;re currently not signed in. Do it first to see your
            reservations.
          </Chip>
        )}
      </div>
    </div>
  );
}
