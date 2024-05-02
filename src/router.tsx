import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react'

import InicioSesion from "./views/InicioSesion";

import PersistLogin from "./layouts/PersistLogin";
import RequireAuth from "./layouts/RequireAuth";

import SideBar from "./layouts/SideBar";
import Header from "./layouts/Header";

const TablaGeneral = lazy(() => import('./views/TablaGeneral'))
const Historial = lazy(() => import('./views/Historial'));

const CrearMaterial = lazy(() => import('./views/CrearMaterial'))
const EditMaterial = lazy(() => import('./views/EditMaterial'))

const CrearUsuario = lazy(() => import('./views/CrearUsuario'))
const ListaUsuario = lazy(() => import('./views/ListaUsuario'))
// import ListaUsuario from "./views/ListaUsuario";
import EditUser, { loader as editUserLoader } from "./views/EditUser";
import Spinner from "./Components/Spinner";


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
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <TablaGeneral />
                                                </Suspense>
                                            ),
                                        },

                                        {

                                            path: "inventario/historial",
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <Historial />
                                                </Suspense>
                                            ),
                                        },

                                        {
                                            //Protect

                                            path: "inventario/material/new",
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <CrearMaterial />
                                                </Suspense>
                                            ),
                                        },
                                        {
                                            path: "inventario/material/:id/editar",
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <EditMaterial />
                                                </Suspense>
                                            ),
                                        }
                                    ]
                                },

                                {

                                    element: <Header title="Administrador" />,
                                    children: [
                                        {
                                            //Protect
                                            path: "admin/user/new",
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <CrearUsuario />
                                                </Suspense>
                                            ),
                                        },
                                        {
                                            //Protect
                                            path: "admin/users",
                                            element: (
                                                <Suspense fallback={<Spinner />}>
                                                    <ListaUsuario />
                                                </Suspense>
                                            ),
                                        },
                                        {
                                            path: "admin/users/:id/edit",
                                            element: <EditUser />,
                                            loader: editUserLoader
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