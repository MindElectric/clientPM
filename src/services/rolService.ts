import { rolResponseSchema } from "../types/tUsers"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export function useGetRol() {
    const axiosPrivate = useAxiosPrivate()
    return async function getRol() {
        const url = `${import.meta.env.VITE_API_URL}/api/rol`
        const { data } = await axiosPrivate(url)
        const result = rolResponseSchema.safeParse(data)
        if (result.success) {
            return { data: result.data };
        }
    }
}