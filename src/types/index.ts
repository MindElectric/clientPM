import { z } from "zod";
import { materialResponseSchema, materialSchema, categoriaMaterialResponseSchema } from "./tMateriales";


export type material = z.infer<typeof materialSchema>
export type materialResponse = z.infer<typeof materialResponseSchema>
export type categoria = z.infer<typeof categoriaMaterialResponseSchema>