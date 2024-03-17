import { IRoute } from "../interfaces/RouteInterfaces"

export type RoutesType<T extends string> = Record<T, IRoute>
