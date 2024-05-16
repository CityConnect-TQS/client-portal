import { TripStatus } from "@/types/trip.ts";

export const colors: Record<
  TripStatus,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  ONTIME: "primary",
  DELAYED: "danger",
  DEPARTED: "warning",
  ONBOARDING: "success",
  ARRIVED: "success",
};

export const names: Record<TripStatus, string> = {
  ONTIME: "On time",
  DELAYED: "Delayed",
  DEPARTED: "Departed",
  ONBOARDING: "Onboarding",
  ARRIVED: "Arrived",
};
