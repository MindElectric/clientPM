import { z } from "zod";
import { areaSchema } from "./tMateriales";

const rolSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const rolResponseSchema = z.object({
    data: z.array(rolSchema)
})

export const UserSchema = z.object({
    id: z.number().optional(),
    username: z.string(),
    id_rol: z.number(),
    id_area: z.number(),
    isActive: z.boolean(),
    area: areaSchema,
    rol: rolSchema,
    password: z.string(),
})

export const UsersSchema = z.object({
    data: z.array(UserSchema)
})

export const createUserSchema = z.object({
    username: z.string().min(3, 'Usuario debe tener mas de 3 caracteres'),
    password: z.string().min(4, 'Contraseña debe tener mas de 4 caracteres'),
    id_area: z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Area es requerida")
    }).nullable().refine(value => value !== null, "Area es requerida"),
    id_rol: z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Rol es requerida")
    }).nullable().refine(value => value !== null, "Rol es requerida"),
    isActive: z.boolean().optional()
})