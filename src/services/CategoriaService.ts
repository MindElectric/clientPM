import axios from "axios";
import { categoriaMaterialResponseSchema } from "../types/tMateriales";

export async function getCategoriaMaterial() {
    const url = `${import.meta.env.VITE_API_URL}/api/categoria_material`
    const { data } = await axios(url)
    const result = categoriaMaterialResponseSchema.safeParse(data)
    if (result.success) {
        return result.data;
    }
}