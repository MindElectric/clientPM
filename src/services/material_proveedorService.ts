import axios from "axios"
import { materialProveedorSchema, materialProveedoresSchema } from "../types/tMateriales";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Adding material and proveedor

export async function getMaterialProveedor() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/material_proveedor`;
        const { data } = await axios(url)
        const result = materialProveedorSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        toast.error("Error en conseguir datos")
    }

}


// Make it so it fetches all the materiales with proveedores
export function useGetMaterialProveedorByMaterialId() {
    const axiosPrivate = useAxiosPrivate()
    return async function getMaterialProveedorByMaterialId(materialId: number) {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/material_proveedor/${materialId}`;
            const { data } = await axiosPrivate(url)
            //console.log(data)
            const result = materialProveedoresSchema.safeParse(data.data)
            //console.log(result.success)
            if (result.success) {
                const proveedores = result.data.map(item => item.id_proveedor)
                return proveedores
            }
        } catch (error) {
            toast.error("Error en conseguir datos")
        }

    }
}

export function useAddMaterialProveedor() {
    const axiosPrivate = useAxiosPrivate()
    return async function addMaterialProveedor(materialId: number, proveedorId: number) {
        try {
            // Asign values to the properties
            const data = { id_proveedor: proveedorId, id_material: materialId }
            const result = materialProveedorSchema.safeParse(data)

            if (result.success) {
                const url = `${import.meta.env.VITE_API_URL}/api/material_proveedor`

                await axiosPrivate.post(url, {
                    id_proveedor: data.id_proveedor,
                    id_material: data.id_material
                })
            }

        } catch (error) {

        }
    }
}

export function useDeleteMaterialProveedor() {
    const axiosPrivate = useAxiosPrivate()
    return async function deleteMaterialProveedor(materialId: number, proveedorId: number) {
        try {
            // const data = { materialId: materialId, proveedorId: proveedorId }
            // const result = materialProveedorSchema.safeParse(data)

            console.log(`Deleting ${proveedorId}`)

            const url = `${import.meta.env.VITE_API_URL}/api/material_proveedor/${proveedorId}/${materialId}`
            await axiosPrivate.delete(url)

        } catch (error) {
            toast.error("Error en borrar proveedor")
        }


    }
}