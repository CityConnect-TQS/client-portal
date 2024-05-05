// import { createContext, useContext, useState } from "react";

// interface a {
//   departure: number;
//   setDeparture: (id: number) => void;
//   setArrival: (id: number) => void;
//   arrival: number;
//   departureTime: string;
//   setDepartureTime: (date: string) => void;
// }

// export const TripSearchContext = createContext<a>({
//   departure: 0,
//   setDeparture: () => {},
//   arrival: 0,
//   departureTime: "",
//   setDepartureTime: () => {},
//   setArrival: () => {},
// });

// export const useTripSearch = () => {
//   return useContext(TripSearchContext);
// }

// export const TripSearchProvider = ({ children }: { children: React.ReactNode }) => {
//   const [departure, setDeparture] = useState<number>(2);
//   const [arrival, setArrival] = useState<number>(0);
//   const [departureTime, setDepartureTime] = useState<string>(new Date().toISOString().substring(0, 10));

//   return (
//     <TripSearchContext.Provider value={{ departure, setDeparture, arrival, setArrival, departureTime, setDepartureTime }}>
//       {children}
//     </TripSearchContext.Provider>
//   );
// };