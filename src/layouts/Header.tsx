import { Outlet } from "react-router-dom"

const Header = ({ title }: { title: string }) => {
    return (
        <div className="ml-10">
            <p className="mt-10 mb-4 text-2xl font-bold">{title}</p>

            <Outlet />
        </div>
    )
}

export default Header
