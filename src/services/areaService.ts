// import axios from "axios";
import { areaResponseSchema } from "../types/tMateriales";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useGetArea() {
    const axiosPrivate = useAxiosPrivate()
    return async function getArea() {
        const url = `${import.meta.env.VITE_API_URL}/api/area`
        const { data } = await axiosPrivate(url)
        const result = areaResponseSchema.safeParse(data)
        if (result.success) {
            return result.data;
        }
    }
}