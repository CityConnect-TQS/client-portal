import { Row } from "@/types/reservation";

export const dummyLayout: Row[] = [
  {
    id: 1,
    seats: [
      { id: "A", isEnabled: false, isAlreadyReserved: false },
      { id: "B", isEnabled: false, isAlreadyReserved: false },
      { id: "C", isEnabled: false, isAlreadyReserved: false },
      { id: "D", isEnabled: false, isAlreadyReserved: false },
      { id: "E", isEnabled: false, isAlreadyReserved: false },
      { id: "F", isEnabled: false, isAlreadyReserved: false },
      { id: "G", isEnabled: false, isAlreadyReserved: true },
      { id: "H", isEnabled: false, isAlreadyReserved: false },
      { id: "I", isEnabled: false, isAlreadyReserved: false },
      { id: "J", isEnabled: false, isAlreadyReserved: false },
    ],
  },
  {
    id: 2,
    seats: [
      { id: "A", isEnabled: false, isAlreadyReserved: false },
      { id: "B", isEnabled: false, isAlreadyReserved: false },
      { id: "C", isEnabled: false, isAlreadyReserved: true },
      { id: "D", isEnabled: false, isAlreadyReserved: false },
      { id: "E", isEnabled: false, isAlreadyReserved: false },
      { id: "F", isEnabled: false, isAlreadyReserved: true },
      { id: "G", isEnabled: false, isAlreadyReserved: false },
      { id: "H", isEnabled: false, isAlreadyReserved: false },
      { id: "I", isEnabled: false, isAlreadyReserved: false },
      { id: "J", isEnabled: false, isAlreadyReserved: false },
    ],
  },
  {
    id: 3,
    seats: [{ id: "J", isEnabled: false, isAlreadyReserved: false }],
  },
  {
    id: 4,
    seats: [
      { id: "A", isEnabled: false, isAlreadyReserved: false },
      { id: "B", isEnabled: false, isAlreadyReserved: true },
      { id: "C", isEnabled: false, isAlreadyReserved: false },
      { id: "D", isEnabled: false, isAlreadyReserved: false },
      { id: "E", isEnabled: false, isAlreadyReserved: false },
      { id: "F", isEnabled: false, isAlreadyReserved: false },
      { id: "G", isEnabled: false, isAlreadyReserved: false },
      { id: "H", isEnabled: false, isAlreadyReserved: false },
      { id: "I", isEnabled: false, isAlreadyReserved: false },
      { id: "J", isEnabled: false, isAlreadyReserved: false },
    ],
  },
  {
    id: 5,
    seats: [
      { id: "A", isEnabled: false, isAlreadyReserved: false },
      { id: "B", isEnabled: false, isAlreadyReserved: false },
      { id: "C", isEnabled: false, isAlreadyReserved: false },
      { id: "D", isEnabled: false, isAlreadyReserved: true },
      { id: "E", isEnabled: false, isAlreadyReserved: false },
      { id: "F", isEnabled: false, isAlreadyReserved: false },
      { id: "G", isEnabled: false, isAlreadyReserved: false },
      { id: "H", isEnabled: false, isAlreadyReserved: true },
      { id: "I", isEnabled: false, isAlreadyReserved: false },
      { id: "J", isEnabled: false, isAlreadyReserved: false },
    ],
  },
];
