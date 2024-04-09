import { useMaterialStore } from "../store"
import MaterialDetails from "./MaterialDetails"


const GeneralTable = () => {
    const materiales = useMaterialStore((state) => state.materiales)
    return (
        <>
            {materiales ?
                <table className="w-full mt-5 table-auto">
                    <thead>
                        <tr>
                            <th className="p-2">Codigo</th>
                            <th className="p-2">Descripcion</th>
                            <th className="p-2">Marca</th>
                            <th className="p-2">Categoria</th>
                            <th className="p-2">Proveedor</th>
                            <th className="p-2">Max.</th>
                            <th className="p-2">Min.</th>
                            <th className="p-2">Costo</th>
                            <th className="p-2">Cantidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {materiales.data.map(material => (
                            <MaterialDetails
                                key={material.id}
                                material={material}
                            />
                        ))}
                    </tbody>
                </table>
                : <h1 className="text-3xl">Loading...</h1>}
        </>
    )
}

export default GeneralTable
