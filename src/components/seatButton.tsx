import { Row, Seat } from "@/types/reservation";
import { Button } from "@nextui-org/react";

interface SeatProps {
  row: Row;
  seat: Seat;
  setLayout: React.Dispatch<React.SetStateAction<Row[]>>;
}

export default function SeatButton({ row, seat, setLayout }: SeatProps) {
  return (
    <Button
      key={seat.id}
      variant={"flat"}
      color={
        seat.isEnabled
          ? "primary"
          : seat.isAlreadyReserved
            ? "warning"
            : "default"
      }
      onClick={() => {
        setLayout((layout) =>
          layout.map((r) => ({
            ...r,
            seats: r.seats.map((s) =>
              s.id + r.id === seat.id + row.id
                ? {
                    ...s,
                    isEnabled: !s.isEnabled,
                  }
                : s
            ),
          }))
        );
      }}
      disabled={seat.isAlreadyReserved}
      className={"h-12 rounded-lg"}
      size="sm"
    >
      {seat.id}
      {row.id}
    </Button>
  );
}
