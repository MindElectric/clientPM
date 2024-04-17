import axios from "axios";
import { proveedorResponseSchema } from "../types/tMateriales";

export async function getProveedores() {
    const url = `${import.meta.env.VITE_API_URL}/api/proveedor`
    const { data } = await axios(url)
    const result = proveedorResponseSchema.safeParse(data)
    if (result.success) {
        return result.data;
    }
}