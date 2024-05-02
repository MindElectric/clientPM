import { useAuth } from "../hooks/useAuth";
import { useMaterialsStore } from "../store/store"
import MaterialDetails from "./MaterialDetails"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GeneralTable = () => {
    const { auth } = useAuth()
    const userRole = auth?.user?.rol
    const materiales = useMaterialsStore((state) => state.materiales)
    return (
        <>
            <ToastContainer />

            <table className="w-full mt-5 table-auto">
                <thead>
                    <tr>
                        <th className="p-2">Codigo</th>
                        <th className="p-2">Descripcion</th>
                        <th className="p-2">Marca</th>
                        <th className="p-2">Categoria</th>
                        <th className="p-2">Modelo</th>
                        {userRole == 2 &&
                            <th className="p-2">Proveedor</th>
                        }
                        <th className="p-2">Max.</th>
                        <th className="p-2">Min.</th>
                        <th className="p-2">Costo</th>
                        <th className="p-2">Cantidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {materiales!.data.map(material => (
                        <MaterialDetails
                            key={material.id}
                            material={material}
                        />
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default GeneralTable
