
//import { materialSchema } from "../types/tMateriales";
import { materialResponseSchema } from "../types/tMateriales";
import { toast } from 'react-toastify';
import { MaterialFields } from "../types";
import { createMaterialSchema } from "../types/tFormMaterial";
import { useAddMaterialProveedor, useDeleteMaterialProveedor, useGetMaterialProveedorByMaterialId } from "./material_proveedorService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";



// Adding material FIX THIS: ADD MODELO FIELD
export function useAddMaterial() {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth()
    return async function addMaterial(data: MaterialFields) {
        try {

            const result = createMaterialSchema.safeParse(data)
            if (result.success) {
                const url = `${import.meta.env.VITE_API_URL}/api/material`

                const materialResponse = await axiosPrivate.post(url, {
                    descripcion: result.data.descripcion,
                    cantidad: result.data.cantidad,
                    modelo: result.data.modelo,
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
                    const proveedorResponse = await axiosPrivate.post(proveedorUrl, {
                        id_proveedor: proveedor.value,
                        id_material: materialResponse.data.data.id,
                    })
                    console.log("Success", proveedorResponse.data)
                }

                //Add norification
                const notificationUrl = `${import.meta.env.VITE_API_URL}/api/notifications`;
                await axiosPrivate.post(notificationUrl, {
                    material_id: materialResponse.data.data.id,
                    user_id: auth?.user?.id,
                    type: "add",
                    codigo: materialResponse.data.data.codigo,
                    cantidad: materialResponse.data.data.cantidad
                })
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
}

// getting material
// export async function getMaterial(page: number = 1, limit: number = 10, category: number | string = "", search: string = "") {
//     const url = `${import.meta.env.VITE_API_URL}/api/material?page=${page}&limit=${limit}&category=${category}&search=${search}`
//     const { data, headers } = await axios(url)
//     const result = materialResponseSchema.safeParse(data)
//     if (result.success) {
//         //console.log(result.data)
//         const totalCount = parseInt(headers['x-total-count']); // Parse totalCount to number
//         return { data: result.data, totalCount };
//     }
// }

export function useGetMaterial() {
    const axiosPrivate = useAxiosPrivate();

    return async function getMaterial(page = 1, limit = 10, category: number | string = '', search = '', max: boolean = false, min: boolean = false) {
        const url = `${import.meta.env.VITE_API_URL}/api/material?page=${page}&limit=${limit}&category=${category}&search=${search}&max=${max}&min=${min}`;
        const { data, headers } = await axiosPrivate(url);
        const result = materialResponseSchema.safeParse(data);
        if (result.success) {
            const totalCount = parseInt(headers['x-total-count']);
            const pageCount = Math.ceil(totalCount / limit)
            //console.log(pageCount)
            return { data: result.data, pageCount };
        }
    };
}

// update cantidad
export function useUpdateCantidad() {
    const axiosPrivate = useAxiosPrivate()
    return async function updateCantidad(id: number, data: number) {
        try {
            const cantidad = { "cantidad": data }
            const url = `${import.meta.env.VITE_API_URL}/api/material/${id}`
            await axiosPrivate.patch(url, cantidad)

            //Send successful notif
            toast.success('Cambios hechos correctamente');

        } catch (error) {
            //Send toast notif if error
            toast.error('Hubo un error en actualizar');
        }
    }
}

export function useUpdateMaterial() {
    const axiosPrivate = useAxiosPrivate()
    const getMaterialProveedorByMaterialId = useGetMaterialProveedorByMaterialId()
    const addMaterialProveedor = useAddMaterialProveedor()
    const deleteMaterialProveedor = useDeleteMaterialProveedor()
    const { auth } = useAuth()
    return async function updateMaterial(id: number, data: any) {
        try {

            const url = `${import.meta.env.VITE_API_URL}/api/material/${id}`
            const result = createMaterialSchema.safeParse(data)
            if (result.success && result.data.proveedores) {
                const materialResponse = await axiosPrivate.put(url, {
                    descripcion: result.data.descripcion,
                    cantidad: result.data.cantidad,
                    codigo: result.data.codigo,
                    costo: result.data.costo,
                    minimo: result.data.minimo,
                    maximo: result.data.maximo,
                    modelo: result.data.modelo,
                    id_marca: result.data.id_marca!.value,
                    id_area: result.data.id_area!.value,
                    id_categoria_material: result.data.id_categoria_material!.value,
                })


                // Add or remove proveedores as needed

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

                // Create update notification
                const notificationUrl = `${import.meta.env.VITE_API_URL}/api/notifications`;
                await axios.post(notificationUrl, {
                    material_id: materialResponse.data.data.id,
                    user_id: auth?.user?.id,
                    type: 'update',
                    codigo: materialResponse.data.data.codigo,
                    cantidad: materialResponse.data.data.cantidad
                })
            }

            //Send successful notif
            toast.success('Cambios hechos correctamente');

        } catch (error) {
            //Send toast notif if successful
            toast.error('Hubo un error en actualizar');
        }
    }
}

export function notifAlertWarning(material: string) {
    toast.warning(`Está en stock bajo de: ${material}`)
}

export function notifSevere(material: string) {
    toast.error(`Se quedó sin: ${material}`)
}

export function notifOverStock(material: string) {
    toast.info(`Tu stock de ${material} está sobre el máximo`)
}