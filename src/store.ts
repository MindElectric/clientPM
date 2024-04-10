import { create } from "zustand";
import { getMaterial } from "./services/materialService";
import { materialResponse } from "./types";
import { produce } from "immer";

type MaterialsStore = {
    materiales: materialResponse | null
    fetchMateriales: (page: number, limit: number, category: string, search: string) => Promise<void>
    increaseCantidad: (num: number) => void
    decreaseCantidad: (id: number) => void
}

type UrlParams = {
    page: number
    limit: number
    category: string
    search: string
    setPage: (data: number) => void
    setLimit: () => void
    setCategory: () => void
    setSearch: (data: string) => void
}


export const useMaterialsStore = create<MaterialsStore>((set) => ({
    materiales: null,
    fetchMateriales: async (page: number, limit: number, category: string, search: string) => {
        const materiales = await getMaterial(page, limit, category, search)
        set(() => ({
            materiales
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

export const useUrlParams = create<UrlParams>((set) => ({
    page: 1,
    limit: 10,
    category: "",
    search: "",

    setPage: (data: number) => {
        set(() => ({ page: data }))
    },

    setLimit: () => {
        set((state) => ({ limit: state.limit }))
    },

    setCategory: () => {
        set((state) => ({ category: state.category }))
    },

    setSearch: (data: string) => {
        set(() => ({ search: data }))
    }
}))