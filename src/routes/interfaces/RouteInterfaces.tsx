import { LayoutRouteProps } from "react-router-dom"

// Routes
export interface IRoute extends LayoutRouteProps {
    path: string
    title: string
    props?: any
}

export interface IRoutes {
    [key: string]: IRoute
}

export interface RouteParams {
    [key: string]: string | number | null
}
