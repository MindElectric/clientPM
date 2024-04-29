import { z } from "zod";
//import { areaSchema, categoriaMaterialSchema, marcaSchema, materialSchema } from "./tMateriales";

const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    id_rol: z.number()
});

// Change so that it gets all the data from material, also remove this
// export const materialNotifSchema = z.object({
//     id: z.number().optional(),
//     descripcion: z.string(),
//     cantidad: z.number(),
//     codigo: z.string(),
//     costo: z.string(),
//     minimo: z.number(),
//     maximo: z.number(),
//     id_marca: z.number(),
//     id_area: z.number(),
//     id_categoria_material: z.number(),
//     //proveedores: z.array(proveedoresSchema),
// });

export const NotificationSchema = z.object({
    id: z.number(),
    type: z.string(),
    createdAt: z.string(), // change to string if necessary
    user_id: z.number(),
    material_id: z.number(),
    user: userSchema,
    codigo: z.string(),
    cantidad: z.string().transform((val) => parseFloat(val)),
    descripcion: z.string()
});

export const NotificationResponseSchema = z.object({
    next: z.object({
        page: z.number(),
        limit: z.number()
    }).optional(),
    previous: z.object({
        page: z.number(),
        limit: z.number()
    }).optional(),
    data: z.array(NotificationSchema)
})

