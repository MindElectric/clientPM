import { material } from "../types"
import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMaterialsStore } from "../store/store";
import { notifAlertWarning, notifOverStock, notifSevere, useDeleteMaterial, useUpdateCantidad } from "../services/materialService";
import { useEffect, useState } from "react";

const GeneralTableSM = ({ material }: { material: material }) => {
    const { auth } = useAuth()
    const userRole = auth?.user?.rol
    const navigate = useNavigate()
    const { increaseCantidad, decreaseCantidad } = useMaterialsStore();
    const updateCantidad = useUpdateCantidad()
    const deleteMaterial = useDeleteMaterial()

    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [isBoxRendered, setIsBoxRendered] = useState(false);

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
            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Codigo</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm ">{material.codigo}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Descripcion</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.descripcion}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Marca</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.marca.nombre}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Categoria</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.categoriaMaterial.nombre}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Modelo</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.modelo}</p>
                </div>
            </div>

            {userRole === 2 &&
                <div className="flex p-4">
                    <div className="w-1/2 pr-4 border-r-2">
                        <p className="mb-2 text-sm font-bold">Proveedor</p>
                    </div>
                    <div className="w-1/2 pl-4">
                        <div className="mb-2 text-sm">{material.proveedores.map(proveedor => (
                            <p key={proveedor.id}>{proveedor.nombre}</p>
                        ))}</div>
                    </div>
                </div>
            }

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Max</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.maximo}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Minimo</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.minimo}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Costo</p>
                </div>
                <div className="w-1/2 pl-4">
                    <p className="mb-2 text-sm">{material.costo}</p>
                </div>
            </div>

            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Cantidad</p>
                </div>
                <div className="w-1/2 pl-4">
                    <div className="flex items-center justify-around">
                        <button id='restar-cantidad'
                            aria-label='Restar cantidad de material'

                            onClick={decrease}

                            className="flex items-center justify-center p-2 rounded-full bg-customAccent w-7 h-7 hover:bg-customAccent-200"><FaMinus /></button>
                        <p className="mb-2 text-sm text-center">{material.cantidad}</p>
                        <button id='sumar-cantidad'
                            aria-label='Aumentar cantidad de material'

                            onClick={increase}

                            className="flex items-center justify-center p-2 rounded-full bg-customAccent w-7 h-7 hover:bg-customAccent-200"><FaPlus /></button>
                    </div>
                </div>

            </div>
            {isBoxRendered && (
                <div className="flex justify-end">
                    <input
                        id='confirmar-cantidad'
                        type='submit'
                        className='p-2 mr-6 text-sm text-white rounded-md cursor-pointer bg-customPrimary hover:bg-customPrimary-200'
                        value="Aceptar Cambio"
                        onClick={() => {
                            handleCantidad()
                        }}
                    />

                    <input
                        id='cancelar-cantidad'
                        type='submit'
                        className='p-2 mr-5 text-sm text-white bg-red-400 rounded-md cursor-pointer hover:bg-red-500'
                        value="Cancelar"
                        onClick={() => {
                            setIsBoxVisible(false)
                        }}
                    />
                </div>
            )

            }

            {/* Actions */}
            <div className="flex p-4">
                <div className="w-1/2 pr-4 border-r-2">
                    <p className="mb-2 text-sm font-bold">Acciones</p>
                </div>
                <div className="w-1/2 pl-4">
                    <div className="flex justify-around">
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
                                onClick={handleDelete}
                            >
                                <FaTrash className="fill-customSecondary hover:fill-customSecondary-200" size={25} />
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeneralTableSM
