// import axios from "axios"
// import { MaterialFields } from "../types"
// import { createMaterialSchema } from "../types/tFormMaterial"

// // Adding material and proveedor
// export async function addMaterial(data: MaterialFields) {
//     try {

//         const result = createMaterialSchema.safeParse(data)

//         if (result.success) {
//             const url = `${import.meta.env.VITE_API_URL}/api/material_proveedor`

//             const { data } = await axios.post(url, {
//                 id_proveedor: result.data.proveedores
//                 id_material:
//             })
//             console.log("Success", data)
//         }
//         else {
//             throw new Error("Datos no validos")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }