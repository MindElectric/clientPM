import { Link } from 'react-router-dom'
import { user } from '../types'
import { FaEdit, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { useChangeActiveUser } from '../services/userService'
import { useState } from 'react'

const UserDetails = ({ user }: { user: user }) => {
    const changeActiveUser = useChangeActiveUser()
    const [isActive, setIsActive] = useState(user.isActive)
    const handleChange = async () => {
        const updatedActive = await changeActiveUser(user.id)
        setIsActive(updatedActive.data);
        //redirect('/admin/users')
    }

    return (
        <>
            <tr className="border-t-2">
                <td className="p-6 text-sm">
                    {user.username}
                </td>
                <td className="p-6 text-sm">
                    {user.area.nombre}
                </td>
                <td className="p-6 text-sm">
                    {user.rol.nombre}
                </td>
                <td className="p-6 text-sm">
                    {isActive ? <p>Activo</p> : <p>No Activo</p>}
                </td>
                <td className="px-4">
                    <div className="flex justify-around">
                        <Link id='editar-material'
                            to={`/admin/users/${user.id}/edit`}
                            aria-label='Editar usuario'                        >
                            <FaEdit className="fill-customSecondary hover:fill-customSecondary-200" size={25} />
                        </Link>
                        <button id='eliminar-material'
                            aria-label='Eliminar Usuario'
                            onClick={handleChange}
                        >
                            {isActive ?
                                <FaUserMinus className="fill-customSecondary hover:fill-customSecondary-200" size={25} />
                                :
                                <FaUserPlus className="fill-customSecondary hover:fill-customSecondary-200" size={25} />
                            }
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default UserDetails
