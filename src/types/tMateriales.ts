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

export const materialProveedorSchema = z.object({
    id_proveedor: z.number(),
    id_material: z.number(),
});

export const materialProveedoresSchema = z.array(
    materialProveedorSchema
);

const proveedoresSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    telefono: z.string().optional(),
    contacto: z.string(),
    // MaterialProveedor: materialProveedorSchema,
});

export const materialSchema = z.object({
    id: z.number().optional(),
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

export const categoriaMaterialResponseSchema = z.object({
    data: z.array(categoriaMaterialSchema)
})

export const marcaResponseSchema = z.object({
    data: z.array(marcaSchema)
})

export const areaResponseSchema = z.object({
    data: z.array(areaSchema)
}
)

export const proveedorResponseSchema = z.object({
    data: z.array(proveedoresSchema)
})

