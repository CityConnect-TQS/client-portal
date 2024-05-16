import { Row, Seat } from "@/types/trip";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface SeatProps {
  row: Row;
  seat: Seat;
  setLayout: Dispatch<SetStateAction<Row[]>>;
}

export default function SeatButton({
  row,
  seat,
  setLayout,
}: Readonly<SeatProps>) {
  return (
    <Button
      key={seat.id}
      variant={"flat"}
      color={
        seat.enabled ? "primary" : seat.alreadyReserved ? "warning" : "default"
      }
      onClick={() => {
        setLayout((layout) =>
          layout.map((r) => ({
            ...r,
            seats: r.seats.map((s) =>
              s.id + r.id === seat.id + row.id
                ? {
                    ...s,
                    isEnabled: !s.enabled,
                  }
                : s,
            ),
          })),
        );
      }}
      disabled={seat.alreadyReserved}
      className={"h-12 rounded-lg"}
      size="sm"
    >
      {seat.id}
      {row.id}
    </Button>
  );
}
