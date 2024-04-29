import { createBrowserRouter } from "react-router-dom";
import InicioSesion from "./views/InicioSesion";

import PersistLogin from "./layouts/PersistLogin";
import RequireAuth from "./layouts/RequireAuth";

import TablaGeneral from "./views/TablaGeneral";
import SideBar from "./layouts/SideBar";
import Historial from "./views/Historial";
import CrearMaterial from "./views/CrearMaterial";
import CrearUsuario from "./views/CrearUsuario";
import Header from "./layouts/Header";
import EditMaterial from "./views/EditMaterial";
import ListaUsuario from "./views/ListaUsuario";


export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                //Public route
                index: true,
                element: <InicioSesion />
            },
            {
                element: <PersistLogin />,
                children: [{
                    element: <RequireAuth />,
                    children: [
                        {
                            element: <SideBar />,
                            children: [
                                {
                                    element: <Header title="Inventario" />,
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
                                            //Protect

                                            path: "inventario/material/new",
                                            element: <CrearMaterial />
                                        },
                                        {
                                            path: "inventario/material/:id/editar",
                                            element: <EditMaterial />
                                        }
                                    ]
                                },

                                {

                                    element: <Header title="Administrador" />,
                                    children: [
                                        {
                                            //Protect
                                            path: "admin/user/new",
                                            element: <CrearUsuario />
                                        },
                                        {
                                            //Protect
                                            path: "admin/users",
                                            element: <ListaUsuario />
                                        }
                                    ]
                                },
                            ]
                        }
                    ],
                }]
                //Revisar si el usuario ingreso



            },

        ]
    }
])