import { useEffect } from "react"
import { useGetUsers } from "../services/userService"
import { useUsersStore } from "../store/store"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import UserTable from "../Components/UserTable"

const ListaUsuario = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getUsers = useGetUsers()
    const setUsers = useUsersStore((state) => state.setUsers)


    useEffect(() => {
        async function fetchData() {
            try {
                const responseUser = await getUsers();
                setUsers(responseUser?.data);
                //setPageCount(response?.pageCount);

            } catch (err) {
                toast.error("Hubo un error recibiendo informacion")
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        fetchData()
    }, []);

    return (
        <div>
            <div className="rounded-lg bg-customTextbox">
                <UserTable />
            </div>
        </div>
    )
}

export default ListaUsuario
