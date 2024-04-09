import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import GeneralTable from "../Components/GeneralTable"
import { useMaterialStore } from "../store"
import { useEffect } from "react"

const TablaGeneral = () => {
    const fetchMateriales = useMaterialStore((state) => state.fetchMateriales)

    useEffect(() => {
        fetchMateriales()
    }, [])

    return (
        <div className="ml-10">
            <p className="mt-10 text-2xl font-bold">Inventario</p>
            <div className="flex mt-4">
                <label className="flex items-center justify-center w-10 mr-2 bg-white border border-black rounded-lg">{<FaSearch size={18} />}</label>
                <input className="h-10 p-5 border border-black rounded-lg w-52"
                    type="text"
                    placeholder="Buscar por código"
                />
            </div>
            <div className="rounded-lg bg-customTextbox">
                <GeneralTable />
            </div>
            <div className="flex justify-end pb-3 mt-4 mb-6">
                <button><FaChevronLeft size={15} /></button>
                <p className="mx-3">1</p>
                <p className="mx-3">2</p>
                <p className="mx-3">3</p>
                <button><FaChevronRight size={15} /></button>
            </div>
        </div>
    )
}

export default TablaGeneral
