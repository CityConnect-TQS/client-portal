import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@fontsource-variable/dm-sans";
import "./index.css";
import "react-material-symbols/rounded";
import { NextUIProvider } from "@nextui-org/react";
import { TripSearchProvider } from "./utils/tripsContext";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <NextUIProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <TripSearchProvider>
              <RouterProvider router={router} />
            </TripSearchProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </NextUIProvider>
    </StrictMode>
  );
}
