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
import { NotificationResponseSchema, NotificationSchema } from "./tNotifications";
import { UserSchema, UsersSchema, createUserSchema, rolResponseSchema, updateUserSchema } from "./tUsers";


export type material = z.infer<typeof materialSchema>
export type materialResponse = z.infer<typeof materialResponseSchema>
export type categoria = z.infer<typeof categoriaMaterialResponseSchema>
export type marca = z.infer<typeof marcaResponseSchema>
export type area = z.infer<typeof areaResponseSchema>
export type proveedores = z.infer<typeof proveedorResponseSchema>

export type MaterialFields = z.infer<typeof createMaterialSchema>

export type notification = z.infer<typeof NotificationSchema>
export type notificationsResponse = z.infer<typeof NotificationResponseSchema>

export type users = z.infer<typeof UsersSchema>
export type user = z.infer<typeof UserSchema>

export type UserFields = z.infer<typeof createUserSchema>
export type UpdateUserFields = z.infer<typeof updateUserSchema>

export type rols = z.infer<typeof rolResponseSchema>