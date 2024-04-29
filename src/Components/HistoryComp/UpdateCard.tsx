import { notification } from "../../types"
import dayjs from "dayjs"

const UpdateCard = ({ notification }: { notification: notification }) => {
    const formatedDate = dayjs(notification.createdAt).format("DD-MM-YYYY HH:mm")
    return (
        <div className="flex flex-col flex-wrap rounded-lg bg-customTextbox">
            <div className="w-full h-10 bg-blue-400 rounded-md" />
            <div className="flex justify-end mt-2 mr-5">
                Fecha: {formatedDate}
            </div>
            <div className="pb-5 pl-5">
                <p className="mb-5 text-xl"> <span className="font-bold">
                    {notification.user.username} &nbsp;

                </span>
                    actualizó:</p>
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

export default UpdateCard
