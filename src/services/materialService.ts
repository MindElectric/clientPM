
//import { materialSchema } from "../types/tMateriales";
import axios from "axios";
import { materialResponseSchema } from "../types/tMateriales";



// Adding material
// export async function addMaterial(data) {
//     try {
//         const result = materialSchema.safeParse(data)
//         console.log(result)

//         if (result.success) {
//             const url = `${import.meta.env.VITE_API_URL}/api/material`
//             const { data } = await axios.post(url, {
//                 codigo: result.data.codigo
//                 //Put rest of the properties here
//             })
//         }
//         else {
//             throw new Error("Datos no validos")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// getting material
export async function getMaterial() {
    const url = `${import.meta.env.VITE_API_URL}/api/material?page=1&limit=3`
    const { data } = await axios(url)
    const result = materialResponseSchema.safeParse(data)
    if (result.success) {
        //console.log(result.data)
        return result.data
    }
}