import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


const RequireAuth = () => {
    const { auth } = useAuth()
    const loacation = useLocation()

    return (
        auth?.user ? <Outlet />
            :
            <Navigate to={"/"} state={{ from: loacation }} replace />
    );
}

export default RequireAuth
