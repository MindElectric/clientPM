import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa"
import { material } from "../types"

const MaterialDetails = ({ material }: { material: material }) => {
    return (
        <>
            <tr className="border-t-2">
                <td className="p-6 text-sm">
                    {material.codigo}
                </td>
                <td className="p-5 text-sm">
                    {material.descripcion}
                </td>
                <td className="p-5 text-sm">
                    {material.marca.nombre}
                </td>
                <td className="p-5 text-sm">
                    {material.categoriaMaterial.nombre}
                </td>
                {/* Listar proveedores */}
                <td className="p-5 text-sm">
                    Proveedor 1
                </td>
                <td className="p-5 text-sm">
                    {material.maximo}
                </td>
                <td className="p-5 text-sm">
                    {material.minimo}
                </td>
                <td className="p-5 text-sm">
                    {material.costo}
                </td>
                <td className="p-5 text-sm text-gray-800 ">
                    <div className="flex items-center justify-around">
                        <button id='restar-cantidad'
                            aria-label='Restar cantidad de material'

                            // onClick={() => decrease()}

                            className="flex items-center justify-center p-2 rounded-full bg-customAccent w-7 h-7 hover:bg-customAccent-200"><FaMinus /></button>
                        <div className="mx-2 text-center">
                            {material.cantidad}
                        </div>
                        <button id='sumar-cantidad'
                            aria-label='Aumentar cantidad de material'

                            // onClick={() => increase()}

                            className="flex items-center justify-center p-2 rounded-full bg-customAccent w-7 h-7 hover:bg-customAccent-200"><FaPlus /></button>
                    </div>
                </td>
                <td className="px-4">
                    <div className="flex justify-between">
                        <button id='restar-cantidad'
                            className="mr-4"
                            aria-label='Restar cantidad de material'

                        // onClick={() => decrease()}

                        ><FaEdit className="fill-customSecondary hover:fill-customSecondary-200" size={25} /></button>
                        <button id='sumar-cantidad'
                            aria-label='Aumentar cantidad de material'

                        // onClick={() => increase()}

                        ><FaTrash className="fill-customSecondary hover:fill-customSecondary-200" size={25} /></button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default MaterialDetails
