import { useNavigate } from 'react-router-dom'
import { user } from '../types'
import { FaEdit, FaTrash } from 'react-icons/fa'

const UserDetails = ({ user }: { user: user }) => {
    const navigate = useNavigate()
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
                    {user.isActive === true ? <p>Activo</p> : <p>No Activo</p>}
                </td>
                <td className="px-4">
                    <div className="flex justify-around">
                        <button id='editar-material'
                            // onClick={() => navigate(`/inventario/material/${material.id}/editar`, {
                            //     state: {
                            //         // Can also be written by just putting 'material'
                            //         material: material
                            //     }
                            // })}
                            aria-label='Restar cantidad de material'


                        ><FaEdit className="fill-customSecondary hover:fill-customSecondary-200" size={25} /></button>
                        <button id='eliminar-material'
                            aria-label='Aumentar cantidad de material'
                        ><FaTrash className="fill-customSecondary hover:fill-customSecondary-200" size={25} /></button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default UserDetails
