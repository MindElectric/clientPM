import { z } from "zod";
import {
    materialResponseSchema,
    materialSchema,
    categoriaMaterialResponseSchema,
    marcaResponseSchema,
    areaResponseSchema,
    proveedorResponseSchema
} from "./tMateriales";

import { createMaterialSchema } from "./tFormMaterial"


export type material = z.infer<typeof materialSchema>
export type materialResponse = z.infer<typeof materialResponseSchema>
export type categoria = z.infer<typeof categoriaMaterialResponseSchema>
export type marca = z.infer<typeof marcaResponseSchema>
export type area = z.infer<typeof areaResponseSchema>
export type proveedores = z.infer<typeof proveedorResponseSchema>

export type MaterialFields = z.infer<typeof createMaterialSchema>