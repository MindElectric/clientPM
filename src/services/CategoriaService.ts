//import axios from "axios";
import { categoriaMaterialResponseSchema } from "../types/tMateriales";
import useAxiosPrivate from "../hooks/useAxiosPrivate";



// export async function getCategoriaMaterial() {
//     const axiosPrivate = useAxiosPrivate()
//     const url = `${import.meta.env.VITE_API_URL}/api/categoria_material`
//     const { data } = await axiosPrivate(url)
//     const result = categoriaMaterialResponseSchema.safeParse(data)
//     if (result.success) {
//         return result.data;
//     }
// }

export function useGetCategoriaMaterial() {
    const axiosPrivate = useAxiosPrivate();

    return async function getCategoriaMaterial() {
        const url = `${import.meta.env.VITE_API_URL}/api/categoria_material`;
        const { data } = await axiosPrivate(url);
        const result = categoriaMaterialResponseSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    };
}