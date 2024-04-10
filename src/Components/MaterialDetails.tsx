import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa"
import { material } from "../types"
import { useMaterialsStore } from "../store";
import { updateCantidad } from "../services/materialService";
import { useEffect, useState } from "react";

const MaterialDetails = ({ material }: { material: material }) => {

    const { increaseCantidad, decreaseCantidad } = useMaterialsStore();


    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [isBoxRendered, setIsBoxRendered] = useState(false);


    //Remove this later
    useEffect(() => {
        if (isBoxVisible) {
            setIsBoxRendered(true);
        } else {
            const timer = setTimeout(() => {
                setIsBoxRendered(false);
            }, 50); // Matches the duration of your animation
            return () => clearTimeout(timer);
        }
    }, [isBoxVisible]);


    // const [materialCantidad, setMaterialCantidad] = useState(material.cantidad);
    const decrease = () => {
        decreaseCantidad(material.id)
        //Remove later
        setIsBoxVisible(true);
    }

    const increase = () => {
        increaseCantidad(material.id)
        //Remove later
        setIsBoxVisible(true);
    }

    const handleCantidad = () => {
        updateCantidad(material.id, material.cantidad)
        //handleToast()
        setIsBoxVisible(false)
        //toast("Cambios hechos satisfactoriamente")
    }

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
                    {material.proveedores.map(proveedor => (
                        <p key={proveedor.id}>{proveedor.nombre}</p>
                    ))}
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

                            onClick={decrease}

                            className="flex items-center justify-center p-2 rounded-full bg-customAccent w-7 h-7 hover:bg-customAccent-200"><FaMinus /></button>
                        <div className="mx-2 text-center">
                            {material.cantidad}
                        </div>
                        <button id='sumar-cantidad'
                            aria-label='Aumentar cantidad de material'

                            onClick={increase}

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
            {isBoxRendered && (
                <tr>
                    {/* Change colspan to 10 when admin is logged in, 9 when not */}
                    <td colSpan={10} className={`h-14 bg-slate-50`}>
                        <div className="flex justify-end">
                            <input
                                id='confirmar-cantidad'
                                type='submit'
                                className='p-2 mr-4 text-white bg-green-400 rounded-md cursor-pointer hover:bg-green-500'
                                value="Aceptar Cambio"
                                onClick={() => {
                                    handleCantidad()
                                }}
                            />
                            <input
                                id='cancelar-cantidad'
                                type='submit'
                                className='p-2 text-white bg-red-400 rounded-md cursor-pointer hover:bg-red-500'
                                value="Cancelar"
                                onClick={() => {
                                    setIsBoxVisible(false)
                                }}
                            />
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}

export default MaterialDetails
