import { create } from "zustand";
import { area, categoria, marca, materialResponse, notificationsResponse, proveedores, rols, users } from "../types";
import { produce } from "immer";
// import { getCategoriaMaterial } from "../services/CategoriaService";
// import { getMarca } from "../services/marcaService";
// import { getArea } from "../services/areaService";
// import { getProveedores } from "../services/ProveedoresService";

type MaterialsStore = {
    materiales: materialResponse | null,
    pageCount: number
    setMateriales: (data: materialResponse | undefined) => void,
    setPageCount: (count: number | undefined) => void
    increaseCantidad: (num: number) => void,
    decreaseCantidad: (id: number) => void
}

type UsersStore = {
    users: users | null,
    setUsers: (data: users | undefined) => void
}

type RolsStore = {
    rols: rols | undefined,
    setRols: (data: rols | undefined) => void
}

type UrlParams = {
    page: number
    limit: number
    category: number | string
    search: string
    max: boolean
    min: boolean
    marca: number | string
    setPage: (data: number) => void
    setLimit: (data: number) => void
    setCategory: (data: number | string) => void
    setSearch: (data: string) => void
    setMax: (data: boolean) => void
    setMin: (data: boolean) => void
    setMarca: (data: number | string) => void
}

type CategoriaStore = {
    categorias: categoria | undefined
    setCategorias: (data: categoria | undefined) => void
}

type MarcaStore = {
    marcas: marca | undefined
    setMarcas: (data: marca | undefined) => void
}

type AreaStore = {
    areas: area | undefined
    setAreas: (data: area | undefined) => void
}

type ProveedorStore = {
    proveedores: proveedores | undefined
    setProveedores: (data: proveedores | undefined) => void
}

type NotificationsStore = {
    notifications: notificationsResponse | null,
    pageCount: number
    setNotifications: (data: notificationsResponse | undefined) => void
    setPageCount: (count: number | undefined) => void
}

type HistorialParams = {
    page: number
    limit: number
    user: number | string
    codigo: string

    setPage: (data: number) => void
    setLimit: (data: number) => void
    setUser: (data: number | string) => void
    setCodigo: (data: string) => void

}


export const useNotificationsStore = create<NotificationsStore>((set) => ({
    notifications: null,
    pageCount: 0,

    setNotifications: (data: notificationsResponse | undefined) => set({ notifications: data }),

    setPageCount: (count: number | undefined) => {
        set(() => ({
            pageCount: count
        }))
    },
}))

export const useMaterialsStore = create<MaterialsStore>((set) => ({
    materiales: null,
    pageCount: 0,
    setMateriales: (data: materialResponse | undefined) => set({ materiales: data }),

    setPageCount: (count: number | undefined) => {
        set(() => ({
            pageCount: count
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

export const useUsersStore = create<UsersStore>((set) => ({
    users: null,

    setUsers: (data: users | undefined) => set({ users: data })
}))

export const useRolsStore = create<RolsStore>((set) => ({
    rols: undefined,

    setRols: (data: rols | undefined) => set({ rols: data })
}))

export const useCategoriaStore = create<CategoriaStore>((set) => ({
    categorias: undefined,
    setCategorias: (data: categoria | undefined) => set({ categorias: data })
}))

export const useMarcaStore = create<MarcaStore>((set) => ({
    marcas: undefined,
    setMarcas: (data: marca | undefined) => set({ marcas: data })
}))

export const useAreaStore = create<AreaStore>((set) => ({
    areas: undefined,
    setAreas: (data: area | undefined) => set({ areas: data })
}))

export const useProveedorStore = create<ProveedorStore>((set) => ({
    proveedores: undefined,
    setProveedores: (data: proveedores | undefined) => set({ proveedores: data })
}))

export const useHistorialParams = create<HistorialParams>((set) => ({
    page: 1,
    limit: 10,
    user: "",
    codigo: "",

    setPage: (data: number) => {
        set(() => ({ page: data }))
    },

    setLimit: (data: number) => {
        set(() => ({ limit: data }))
    },

    setUser: (data: number | string) => {
        set(() => ({ user: data }))
    },

    setCodigo: (data: string) => {
        set(() => ({ codigo: data }))
    }
}))

export const useUrlParams = create<UrlParams>((set) => ({
    page: 1,
    limit: 10,
    category: "",
    search: "",
    max: false,
    min: false,
    marca: "",

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
    },
    setMax: (data: boolean) => {
        set(() => ({ max: data }))
    },

    setMin: (data: boolean) => {
        set(() => ({ min: data }))
    },

    setMarca: (data: number | string) => {
        set(() => ({ marca: data }))
    }
}))