import { FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa"
import { material } from "../types"
import { useMaterialsStore } from "../store/store";
import { notifAlertWarning, notifOverStock, notifSevere, useDeleteMaterial, useUpdateCantidad } from "../services/materialService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MaterialDetails = ({ material }: { material: material }) => {
    const { auth } = useAuth()
    const userRole = auth?.user?.rol
    const navigate = useNavigate()
    const { increaseCantidad, decreaseCantidad } = useMaterialsStore();
    const updateCantidad = useUpdateCantidad()
    const deleteMaterial = useDeleteMaterial()
    //const [materialCantidad, setMaterialCantidad] = useState(material.cantidad);


    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [isBoxRendered, setIsBoxRendered] = useState(false);


    //Remove this later
    useEffect(() => {
        if (isBoxVisible) {
            setIsBoxRendered(true);
        } else {
            const timer = setTimeout(() => {
                setIsBoxRendered(false);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isBoxVisible]);

    useEffect(() => {
        if (material.cantidad < material.minimo) {
            notifAlertWarning(material.codigo)
        }
    }, [material.cantidad])


    // const [materialCantidad, setMaterialCantidad] = useState(material.cantidad);
    const decrease = () => {
        setIsBoxVisible(true);
        if (material.cantidad === 0) {
            return
        }
        decreaseCantidad(material.id!)
    }

    const increase = () => {
        increaseCantidad(material.id!)
        //Change for something better
        setIsBoxVisible(true);
    }

    const handleCantidad = () => {
        updateCantidad(material.id!, material.cantidad)
        setIsBoxVisible(false)
        if (material.cantidad > material.maximo) {
            notifOverStock(material.codigo)
        }
        if (material.cantidad === 0) {
            notifSevere(material.codigo)
            return
        }
        if (material.cantidad < material.minimo) {
            notifAlertWarning(material.codigo)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("¿Eliminar material?")) {
            console.log("Deleting");
            await deleteMaterial(material.id!, material)
            navigate("/inventario/tablageneral");
        }
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
                <td className="p-5 text-sm">
                    {material.modelo}
                </td>
                {/* Listar proveedores */}
                {userRole === 2 &&
                    <td className="p-5 text-sm">
                        {material.proveedores.map(proveedor => (
                            <p key={proveedor.id}>{proveedor.nombre}</p>
                        ))}
                    </td>
                }
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
                        <button id='editar-material'
                            onClick={() => navigate(`/inventario/material/${material.id}/editar`, {
                                state: {
                                    // Can also be written by just putting 'material'
                                    material: material
                                }
                            })}
                            className="mr-4"
                            aria-label='Restar cantidad de material'


                        ><FaEdit className="fill-customSecondary hover:fill-customSecondary-200" size={25} /></button>

                        {userRole === 2 &&
                            <button id='eliminar-material'
                                aria-label='Editar material'
                                onClick={handleDelete}>
                                <FaTrash className="fill-customSecondary hover:fill-customSecondary-200" size={25} />
                            </button>
                        }
                    </div>
                </td>
            </tr>
            {isBoxRendered && (
                <tr>
                    {/* Change colspan to 11 when admin is logged in, 10 when not */}
                    <td colSpan={userRole == 2 ? 11 : 10} className={`h-14 bg-slate-50`}>
                        <div className="flex justify-end">
                            <input
                                id='confirmar-cantidad'
                                type='submit'
                                className='p-2 mr-4 text-white rounded-md cursor-pointer bg-customPrimary hover:bg-customPrimary-200'
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
