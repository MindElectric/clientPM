import { z } from "zod";

//Validation
export const createMaterialSchema = z.object({
    descripcion: z.string().min(3, 'Descripción debe tener más de 3 caracteres'),
    codigo: z.string().min(3, 'Código debe tener más de 3 caracteres'),
    cantidad: z.number().min(0, "Cantidad debe ser positivo"),
    costo: z.string().min(1, "Costo debe ser mayor a 0"),
    maximo: z.number().min(1, "Maximo debe ser mayor a 0"),
    minimo: z.number().min(1, "Minimo debe ser mayor a 0"),
    modelo: z.string().transform((val) => val || 'N/A'), // If the value is empty, transform to 'N/A'
    id_marca: z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Marca es requerida")
    }).nullable().refine(value => value !== null, "Marca es requerida"),
    id_area: z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Area es requerida")
    }).nullable().refine(value => value !== null, "Area es requerida"),
    id_categoria_material: z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Categoria es requerida")
    }).nullable().refine(value => value !== null, "Categoria es requerida"),
    proveedores: z.array(z.object({
        value: z.number().nullable(),
        label: z.string().min(1, "Proveedores es requerido")
    })).min(1, "Debe de haber al menos 1 proveedor").nullable().refine(value => value !== null && value.length > 0, "Proveedores es requerido"),
}).refine(data => data.minimo < data.maximo, {
    message: "Minimo debe ser menor que Maximo",
    path: ['minimo'] // point to 'minimo' field in error message
});