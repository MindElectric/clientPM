import { useUsersStore } from "../store/store"
import UserDetails from "./UserDetails"




const UserTable = () => {

    const users = useUsersStore((state) => state.users)



    return (
        <>
            {!users ? <p>Loading...</p>
                :
                <table className="w-full mt-5 table-auto">
                    <thead>
                        <tr>
                            <th className="p-2">Usuario</th>
                            <th className="p-2">Area</th>
                            <th className="p-2">Rol</th>
                            <th className="p-2">Activo</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.data.map(user => (
                            <UserDetails
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default UserTable
