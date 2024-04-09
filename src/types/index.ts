import { z } from "zod";
import { materialResponseSchema, materialSchema } from "./tMateriales";


export type material = z.infer<typeof materialSchema>
export type materialResponse = z.infer<typeof materialResponseSchema>