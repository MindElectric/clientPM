//import { useNavigate } from "react-router-dom"
import { notification } from "../../types"
import dayjs from "dayjs"

const AgregarCard = ({ notification }: { notification: notification }) => {
    //const navigate = useNavigate()
    const formatedDate = dayjs(notification.createdAt).format("DD-MM-YYYY HH:mm")

    return (
        <div className="flex flex-col flex-wrap rounded-lg bg-customTextbox">
            <div className="w-full h-10 rounded-md bg-lime-400" />
            <div className="flex justify-end mt-2 mr-5">
                Fecha: {formatedDate}
            </div>
            <div className="pb-5 pl-5">
                <p className="mb-5 text-xl"> <span className="font-bold">
                    {notification.user.username} &nbsp;

                </span>
                    agregó:</p>
                {/* Material Properties */}
                <div className="flex flex-col text-lg">
                    <div className="mb-5">
                        <div className="flex">
                            <span className="font-bold whitespace-pre">Código:&emsp;&emsp;   </span> {notification.codigo}
                            <span className="ml-40 font-bold whitespace-pre">Cantidad: </span> {notification.cantidad}
                        </div>
                    </div>
                    {/* <div className="mb-5">
                        <span className="font-bold">Descripcion:</span> {notification.material.descripcion}
                    </div> */}
                    <div className="flex justify-end mr-7">
                        {/* <button
                            onClick={() => navigate(`/inventario/material/${notification.material_id}/editar`, {
                                // state: {
                                //     // Can also be written by just putting 'material'
                                //     material: material
                                // }
                            })}
                            className="p-4 bg-green-400"
                        >
                            Revisar detalles
                        </button> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AgregarCard
