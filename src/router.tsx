import { createBrowserRouter } from "react-router-dom";
import InicioSesion from "./views/InicioSesion";
import TablaGeneral from "./views/TablaGeneral";
import SideBar from "./layouts/SideBar";


export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <InicioSesion />
            },
            {
                element: <SideBar />,
                children: [
                    {

                        path: "tablaGeneral",
                        element: <TablaGeneral />
                    }
                ]
            },

        ]
    }
])