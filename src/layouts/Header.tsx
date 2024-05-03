import { FaSignOutAlt } from "react-icons/fa"
import { Outlet, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout";

const Header = ({ title }: { title: string }) => {
    const logout = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout()
        navigate("/")
    }

    return (
        <div className="mt-3 sm:ml-2 lg:ml-10">
            <div className="flex justify-between">
                <p className="mt-10 mb-4 text-2xl font-bold">{title}</p>


                <button className="px-2 text-base w-36"
                    onClick={signOut}
                >
                    <div className="flex items-center justify-between font-bold">
                        Cerrar Sesion
                        <FaSignOutAlt />
                    </div>
                </button>

            </div>
            <section>
                <Outlet />
            </section>
        </div>
    )
}

export default Header
