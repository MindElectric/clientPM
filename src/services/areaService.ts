import axios from "axios";
import { areaResponseSchema } from "../types/tMateriales";

export async function getArea() {
    const url = `${import.meta.env.VITE_API_URL}/api/area`
    const { data } = await axios(url)
    const result = areaResponseSchema.safeParse(data)
    if (result.success) {
        return result.data;
    }
}