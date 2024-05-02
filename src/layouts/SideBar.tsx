import { Outlet, useLocation, useNavigate } from "react-router-dom"
import fire_logo from '../assets/fire_logo.webp'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Submenu from "../Components/Submenu";
import { FaBars } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../hooks/useAuth";


const SideBar = () => {
    const { auth } = useAuth()
    const userRole = auth?.user?.rol

    const logout = useLogout()
    const navigate = useNavigate()
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const [isOpen, setIsOpen] = useState(isTab ? false : true)

    const { pathname } = useLocation()


    const signOut = async () => {
        await logout()
        navigate("/")
    }

    // Check to see if device is smaller than isTab
    const sidebarAnimation = isTab ? {
        open: {
            x: 0,
            width: "16rem",
            transition: {
                damping: 40
            }
        },
        closed: {
            x: -250,
            width: "0rem",
            transition: {
                damping: 40,
                delay: 0.15
            }
        }
    } : {
        open: {
            width: "16rem",
            transition: {
                damping: 40
            }
        },
        closed: {
            width: "0rem",
            transition: {
                damping: 40
            }
        }
    }

    useEffect(() => {
        if (isTab) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }, [isTab])

    //Close sidebar when selecting a path link (mobile only)
    useEffect(() => {
        isTab && setIsOpen(false)
    }, [pathname])


    const subMenuList = [
        {
            name: "inventario",
            menus: ["tabla general", "crear material", "historial"],
            url: ['inventario/tablageneral', 'inventario/material/new', 'inventario/historial']
        },
        {
            name: "admin",
            menus: ["listar usuarios", "Crear usuario"],
            url: ["admin/users", 'admin/user/new']
        },
    ]

    // Filter the list based on the user's role
    const filteredMenuList = subMenuList.filter(menu => {
        // If the menu is for admins, only include it if the user is an admin
        if (menu.name === "admin") {
            return userRole === 2; // 2 represents admin
        }
        // Include all other menus
        return true;
    });

    return (
        <div className="flex min-h-screen gap-5 ">

            <div
                onClick={() => setIsOpen(false)}
                className={`md:hidden fixed inset-0 max-h-screen z-[995] bg-black/50 ${isOpen ? "block" : "hidden"}`}>
            </div>

            <div className="top-0 h-screen md:sticky">
                <motion.div
                    variants={sidebarAnimation}
                    initial={{ x: isTab ? -250 : 0 }}
                    animate={isOpen ? "open" : "closed"}
                    className="w-[16rem] max-w-[16rem] shadow-xl overflow-hidden bg-customPrimary  z-[999] min-h-screen
                md:relative fixed
            ">

                    <div>
                        <div className="flex justify-center m-5">
                            <img alt="logo-pequeños-momentos"
                                src={fire_logo}
                                height={100}
                                width={100}

                            />
                        </div>

                        {/* Menu */}
                        <div className="flex flex-col h-[34.1rem]">
                            <ul className="flex flex-col gap-1 overflow-x-hidden whitespace-pre px-2.5 py-5  scrollbar-thin
                        scrollbar-track-customPrimary scrollbar-thumb-slate-50 h-screen
                        ">
                                {/* <li className="w-full">
                                <NavLink to="inventario/tablageneral" className={"link"}>Tabla General</NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink to="inventario/material/new" className={"link"}>Crear Material</NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink to="inventario/historial" className={"link"}>Historial</NavLink>
                            </li> */}

                                {/* Submenu */}
                                <div className="border-t-2 border-customPrimary-200">
                                    {
                                        filteredMenuList?.map(menu => (

                                            <div key={menu.name} className="flex flex-col gap-1">
                                                <Submenu data={menu} />

                                            </div>

                                        ))
                                    }
                                </div>

                            </ul>
                        </div>

                        <div className="flex justify-end w-full h-fit">
                            <button className="w-full p-4 mb-10 text-base transition-all ease-in bg-customPrimary-200 hover:bg-customPrimary-100"
                                onClick={signOut}
                            >
                                <div className="flex items-center justify-between font-bold">
                                    Cerrar Sesion
                                    <FaRightToBracket />
                                </div>
                            </button>
                        </div>

                    </div>
                </motion.div>
            </div>

            <div className="m-3 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                <FaBars size={25} />
            </div>

            <main className="flex-wrap flex-1 max-w-6xl">
                <Outlet />
            </main>
        </div>
    )
}

export default SideBar
