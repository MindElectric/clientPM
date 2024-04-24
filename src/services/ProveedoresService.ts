// import axios from "axios";
import { proveedorResponseSchema } from "../types/tMateriales";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useGetProveedores() {
    const axiosPrivate = useAxiosPrivate()
    return async function getProveedores() {
        const url = `${import.meta.env.VITE_API_URL}/api/proveedor`
        const { data } = await axiosPrivate(url)
        const result = proveedorResponseSchema.safeParse(data)
        if (result.success) {
            return result.data;
        }
    }
}