/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const TripsIndexLazyImport = createFileRoute('/trips/')()
const ReservationIndexLazyImport = createFileRoute('/reservation/')()
const ReservationSuccessLazyImport = createFileRoute('/reservation/success')()
const ReservationMyreservationsLazyImport = createFileRoute(
  '/reservation/myreservations',
)()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TripsIndexLazyRoute = TripsIndexLazyImport.update({
  path: '/trips/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/trips/index.lazy').then((d) => d.Route))

const ReservationIndexLazyRoute = ReservationIndexLazyImport.update({
  path: '/reservation/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reservation/index.lazy').then((d) => d.Route),
)

const ReservationSuccessLazyRoute = ReservationSuccessLazyImport.update({
  path: '/reservation/success',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reservation/success.lazy').then((d) => d.Route),
)

const ReservationMyreservationsLazyRoute =
  ReservationMyreservationsLazyImport.update({
    path: '/reservation/myreservations',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/reservation/myreservations.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/reservation/myreservations': {
      preLoaderRoute: typeof ReservationMyreservationsLazyImport
      parentRoute: typeof rootRoute
    }
    '/reservation/success': {
      preLoaderRoute: typeof ReservationSuccessLazyImport
      parentRoute: typeof rootRoute
    }
    '/reservation/': {
      preLoaderRoute: typeof ReservationIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/trips/': {
      preLoaderRoute: typeof TripsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  ReservationMyreservationsLazyRoute,
  ReservationSuccessLazyRoute,
  ReservationIndexLazyRoute,
  TripsIndexLazyRoute,
])

/* prettier-ignore-end */
