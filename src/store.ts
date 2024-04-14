import { create } from "zustand";
import { materialResponse } from "./types";
import { produce } from "immer";
import { materialResponseSchema } from "./types/tMateriales";
import axios from "axios";

type MaterialsStore = {
    materiales: materialResponse | null,
    totalCount: number | null,
    pageCount: number
    fetchMateriales: (page: number, limit: number, category: string, search: string) => Promise<void>,
    increaseCantidad: (num: number) => void,
    decreaseCantidad: (id: number) => void
}

type UrlParams = {
    page: number
    limit: number
    category: string
    search: string
    setPage: (data: number) => void
    setLimit: (data: number) => void
    setCategory: (data: string) => void
    setSearch: (data: string) => void
}


export const useMaterialsStore = create<MaterialsStore>((set) => ({
    materiales: null,
    totalCount: null,
    pageCount: 0,
    fetchMateriales: async (page: number, limit: number, category: string, search: string) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/material?page=${page}&limit=${limit}&category=${category}&search=${search}`;
            const { data, headers } = await axios.get(url);
            const result = materialResponseSchema.safeParse(data);
            const totalCount = parseInt(headers['x-total-count'] || '0');
            const pageCount = Math.ceil(totalCount / limit)
            if (result.success) {
                set({ materiales: result.data, totalCount, pageCount });
            } else {
                throw new Error('Invalid data received');
            }
        } catch (error) {
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

    setCategory: (data: string) => {
        set(() => ({ category: data }))
    },

    setSearch: (data: string) => {
        set(() => ({ search: data }))
    }
}))