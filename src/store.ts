import { create } from "zustand";
import { getMaterial } from "./services/materialService";
import { materialResponse } from "./types";

type MaterialStore = {
    materiales: materialResponse | null
    fetchMateriales: () => Promise<void>

}

export const useMaterialStore = create<MaterialStore>((set) => ({
    materiales: null,
    fetchMateriales: async () => {
        const materiales = await getMaterial()
        set(() => ({
            materiales
        }))

    }
}))