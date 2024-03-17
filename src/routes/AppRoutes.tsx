import { Routes, Route, Navigate, NavigateProps } from "react-router-dom"
import { IRoutes } from "./interfaces/RouteInterfaces"

interface IAppRoutesProps {
    routes: IRoutes
}

export const AppRoutes: React.FC<IAppRoutesProps> = ({ routes }) => {
    const routesList = Object.values(routes)

    return (
        <Routes>
            {routesList.map((route) => {
                const { element, path, ...rest } = route
                return <Route key={path} path={path} element={element} {...rest} />
            })}
        </Routes>
    )
}
