import React from "react"
import s from "./app.module.css"
import Header from "../components/Header/Header"
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar"
import { AppRoutes } from "../routes/AppRoutes"
import { routes } from "../routes/routes"

function App() {
    return (
        <>
            <Header />
            <main className={s.app}>
                <ErrorSnackbar />
                <AppRoutes routes={routes} />
            </main>
        </>
    )
}

export default App
