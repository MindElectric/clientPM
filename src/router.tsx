import { createBrowserRouter } from "react-router-dom";
import InicioSesion from "./views/InicioSesion";
import TablaGeneral from "./views/TablaGeneral";
import SideBar from "./layouts/SideBar";
import Historial from "./views/Historial";
import CrearMaterial from "./views/CrearMaterial";
import CrearUsuario from "./views/CrearUsuario";


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

                        path: "inventario/tablageneral",
                        element: <TablaGeneral />
                    },

                    {

                        path: "inventario/historial",
                        element: <Historial />
                    },

                    {

                        path: "inventario/material/new",
                        element: <CrearMaterial />
                    },

                    {

                        path: "admin/user/new",
                        element: <CrearUsuario />
                    },
                ]
            },

        ]
    }
])