import { z } from "zod";

const marcaSchema = z.object({
    id: z.number(),
    nombre: z.string(),
});

const areaSchema = z.object({
    id: z.number(),
    nombre: z.string(),
});

const categoriaMaterialSchema = z.object({
    id: z.number(),
    nombre: z.string(),
});

const materialProveedorSchema = z.object({
    id_proveedor: z.number(),
    id_material: z.number(),
});

const proveedoresSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    telefono: z.string().optional(),
    contacto: z.string(),
    MaterialProveedor: materialProveedorSchema,
});

export const materialSchema = z.object({
    id: z.number(),
    codigo: z.string(),
    descripcion: z.string(),
    marca: marcaSchema,
    cantidad: z.number(),
    costo: z.string(),
    minimo: z.number(),
    maximo: z.number(),
    id_marca: z.number(),
    id_area: z.number(),
    id_categoria_material: z.number(),
    area: areaSchema,
    categoriaMaterial: categoriaMaterialSchema,
    proveedores: z.array(proveedoresSchema),
});

export const materialResponseSchema = z.object({
    next: z.object({
        page: z.number(),
        limit: z.number()
    }).optional(),
    previous: z.object({
        page: z.number(),
        limit: z.number()
    }).optional(),
    data: z.array(materialSchema)
})

