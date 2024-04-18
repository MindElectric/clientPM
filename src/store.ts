import { create } from "zustand";
import { area, categoria, marca, materialResponse, proveedores } from "./types";
import { produce } from "immer";
import { materialResponseSchema, } from "./types/tMateriales";
import axios from "axios";
import { getCategoriaMaterial } from "./services/CategoriaService";
import { getMarca } from "./services/marcaService";
import { getArea } from "./services/areaService";
import { getProveedores } from "./services/ProveedoresService";

type MaterialsStore = {
    materiales: materialResponse | null,
    totalCount: number | null,
    pageCount: number
    fetchMateriales: (page: number, limit: number, category: number | string, search: string) => Promise<void>,
    increaseCantidad: (num: number) => void,
    decreaseCantidad: (id: number) => void
}

type UrlParams = {
    page: number
    limit: number
    category: number | string
    search: string
    setPage: (data: number) => void
    setLimit: (data: number) => void
    setCategory: (data: number | string) => void
    setSearch: (data: string) => void
}

type CategoriaStore = {
    categorias: categoria | undefined
    fetchCategorias: () => Promise<void>
}

type MarcaStore = {
    marcas: marca | undefined
    fetchMarcas: () => Promise<void>
}

type AreaStore = {
    areas: area | undefined
    fetchAreas: () => Promise<void>
}

type ProveedorStore = {
    proveedores: proveedores | undefined
    fetchProveedores: () => Promise<void>
}


export const useMaterialsStore = create<MaterialsStore>((set) => ({
    materiales: null,
    totalCount: null,
    pageCount: 0,
    fetchMateriales: async (page: number, limit: number, category: number | string, search: string) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/material?page=${page}&limit=${limit}&category=${category}&search=${search}`;
            const { data, headers } = await axios.get(url);
            const result = materialResponseSchema.safeParse(data);
            // console.log(data)
            const totalCount = parseInt(headers['x-total-count'] || '0');
            const pageCount = Math.ceil(totalCount / limit)
            if (result.success) {
                set({ materiales: result.data, totalCount, pageCount });
            } else {
                throw new Error('Invalid data received');
            }
        } catch (error) {
            //TODO: Send error notification
            console.error('Error fetching materials:', error);
        }
    },

    setTotalCount: (count: number) => {
        set(() => ({
            totalCount: count
        }))
    },

    increaseCantidad: (id: number) => {
        set((state) => produce(state, draftState => {
            const material = draftState.materiales?.data.find(m => m.id === id);
            if (material) {
                material.cantidad += 1;
            }
        }))
    },

    decreaseCantidad: (id: number) => {
        set((state) => produce(state, draftState => {
            const material = draftState.materiales?.data.find(m => m.id === id);
            if (material) {
                material.cantidad -= 1;
            }
        }))
    }
}))

export const useCategoriaStore = create<CategoriaStore>((set) => ({
    categorias: undefined,
    fetchCategorias: async () => {
        try {
            const categorias = await getCategoriaMaterial()
            set(() => ({
                categorias
            }))
        } catch (error) {
            //TODO: Send error notification
            console.error('Error fetching materials:', error);
        }
    }
}))

export const useMarcaStore = create<MarcaStore>((set) => ({
    marcas: undefined,
    fetchMarcas: async () => {
        try {
            const marcas = await getMarca()
            set(() => ({
                marcas
            }))
        } catch (error) {
            console.error("Error fetching marcas")
        }
    }
}))

export const useAreaStore = create<AreaStore>((set) => ({
    areas: undefined,
    fetchAreas: async () => {
        try {
            const areas = await getArea()
            set(() => ({
                areas
            }))
        } catch (error) {

        }
    }
}))

export const useProveedorStore = create<ProveedorStore>((set) => ({
    proveedores: undefined,
    fetchProveedores: async () => {
        try {
            const proveedores = await getProveedores()
            set(() => ({
                proveedores
            }))
        } catch (error) {

        }
    }
}))

export const useUrlParams = create<UrlParams>((set) => ({
    page: 1,
    limit: 10,
    category: "",
    search: "",

    setPage: (data: number) => {
        set(() => ({ page: data }))
    },

    setLimit: (data: number) => {
        set(() => ({ limit: data }))
    },

    setCategory: (data: number | string) => {
        set(() => ({ category: data }))
    },

    setSearch: (data: string) => {
        set(() => ({ search: data }))
    }
}))