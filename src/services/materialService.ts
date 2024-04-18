
//import { materialSchema } from "../types/tMateriales";
import axios from "axios";
import { materialResponseSchema } from "../types/tMateriales";
import { toast } from 'react-toastify';
import { MaterialFields } from "../types";
import { createMaterialSchema } from "../types/tFormMaterial";
import { addMaterialProveedor, deleteMaterialProveedor, getMaterialProveedorByMaterialId } from "./material_proveedorService";



// Adding material
export async function addMaterial(data: MaterialFields) {
    try {

        const result = createMaterialSchema.safeParse(data)

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/material`

            const materialResponse = await axios.post(url, {
                descripcion: result.data.descripcion,
                cantidad: result.data.cantidad,
                codigo: result.data.codigo,
                costo: result.data.costo,
                minimo: result.data.minimo,
                maximo: result.data.maximo,
                id_marca: result.data.id_marca!.value,
                id_area: result.data.id_area!.value,
                id_categoria_material: result.data.id_categoria_material!.value,
            })
            // Loop through each proveedor and add them to material_material
            //There may be some issues here if the data doesn't upload correctly
            const proveedorUrl = `${import.meta.env.VITE_API_URL}/api/material_proveedor`
            for (const proveedor of result.data.proveedores!) {
                const proveedorResponse = await axios.post(proveedorUrl, {
                    id_proveedor: proveedor.value,
                    id_material: materialResponse.data.data.id,
                })
                console.log("Success", proveedorResponse.data)
            }
            toast.success('Datos agregados correctamente')
        }
        else {
            toast.error('Hubo un error')
            throw new Error("Datos no validos")
        }
    } catch (error) {
        toast.error("Hay problemas con el servidor")
        console.log(error)
    }
}

// getting material
export async function getMaterial(page: number = 1, limit: number = 10, category: number | string = "", search: string = "") {
    const url = `${import.meta.env.VITE_API_URL}/api/material?page=${page}&limit=${limit}&category=${category}&search=${search}`
    const { data, headers } = await axios(url)
    const result = materialResponseSchema.safeParse(data)
    if (result.success) {
        //console.log(result.data)
        const totalCount = parseInt(headers['x-total-count']); // Parse totalCount to number
        return { data: result.data, totalCount };
    }
}

// update cantidad
export async function updateCantidad(id: number, data: number) {
    try {
        const cantidad = { "cantidad": data }

        const url = `${import.meta.env.VITE_API_URL}/api/material/${id}`
        await axios.patch(url, cantidad)

        //Send successful notif
        toast.success('Cambios hechos correctamente');

    } catch (error) {
        //Send toast notif if succesful
        toast.error('Hubo un error en actualizar');
    }
}

export async function updateMaterial(id: number, data: any) {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/material/${id}`
        const result = createMaterialSchema.safeParse(data)
        if (result.success && result.data.proveedores) {
            await axios.put(url, {
                descripcion: result.data.descripcion,
                cantidad: result.data.cantidad,
                codigo: result.data.codigo,
                costo: result.data.costo,
                minimo: result.data.minimo,
                maximo: result.data.maximo,
                id_marca: result.data.id_marca!.value,
                id_area: result.data.id_area!.value,
                id_categoria_material: result.data.id_categoria_material!.value,
            })


            const currentProveedores = await getMaterialProveedorByMaterialId(id)
            //console.log(currentProveedores)
            if (currentProveedores) {
                // Identify the proveedores to be added or removed
                const proveedoresToAdd = result.data.proveedores.filter(proveedor => proveedor.value !== null && !currentProveedores.includes(proveedor.value))
                const proveedoresToRemove = currentProveedores.filter(proveedor => !result.data.proveedores?.map(p => p.value).includes(proveedor))

                console.log("Proveedores to add", proveedoresToAdd)
                console.log("Proveedores to remove", proveedoresToRemove)
                // Make the necessary API calls to add or remove the proveedores
                for (const proveedor of proveedoresToAdd) {
                    if (proveedor.value !== null) {
                        await addMaterialProveedor(id, proveedor.value)
                    }
                }
                for (const proveedor of proveedoresToRemove) {
                    if (proveedor !== null) {
                        await deleteMaterialProveedor(id, proveedor)
                    }
                }

                console.log("Success")
            }
        }

        //Send successful notif
        toast.success('Cambios hechos correctamente');

    } catch (error) {
        //Send toast notif if successful
        toast.error('Hubo un error en actualizar');
    }
}

export function notifAlertWarning(material: string) {
    toast.warning(`Está en stock bajo en: ${material}`)
}

export function notifSevere(material: string) {
    toast.error(`Se quedó sin: ${material}`)
}

export function notifOverStock(material: string) {
    toast.info(`Tu stock de ${material} está sobre el máximo`)
}