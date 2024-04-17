import axios from "axios"
import { marcaResponseSchema } from "../types/tMateriales"

export async function getMarca() {
    const url = `${import.meta.env.VITE_API_URL}/api/marca`
    const { data } = await axios(url)
    const result = marcaResponseSchema.safeParse(data)
    if (result.success) {
        return result.data;
    }
}