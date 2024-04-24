//import axios from "axios"
import { marcaResponseSchema } from "../types/tMateriales"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export function useGetMarca() {
    const axiosPrivate = useAxiosPrivate()
    return async function getMarca() {
        const url = `${import.meta.env.VITE_API_URL}/api/marca`
        const { data } = await axiosPrivate(url)
        const result = marcaResponseSchema.safeParse(data)
        if (result.success) {
            return result.data;
        }
    }
}