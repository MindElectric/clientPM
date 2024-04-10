import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import GeneralTable from "../Components/GeneralTable"
import { useMaterialsStore, useUrlParams } from "../store"
import { useEffect } from "react"

const TablaGeneral = () => {
    const fetchMateriales = useMaterialsStore((state) => state.fetchMateriales)
    const page = useUrlParams((state) => state.page)
    const setPage = useUrlParams((state) => state.setPage)
    const limit = useUrlParams((state) => state.limit)
    const category = useUrlParams((state) => state.category)
    const search = useUrlParams((state) => state.search)
    const setSearch = useUrlParams((state) => state.setSearch);

    useEffect(() => {
        fetchMateriales(page, limit, category, search)
        console.log(page)
    }, [page, limit, category, search])

    return (
        <div className="ml-10">
            <p className="mt-10 text-2xl font-bold">Inventario</p>
            <div className="flex mt-4">
                <form className="flex">
                    <button className="flex items-center justify-center w-10 mr-2 bg-white border border-black rounded-lg"
                        type="submit"
                    >{<FaSearch size={18} />}</button>
                    <input id="search-by-code" className="h-10 p-5 border border-black rounded-lg w-52"
                        type="text"
                        placeholder="Buscar por código"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <div className="rounded-lg bg-customTextbox">
                <GeneralTable />
            </div>
            <div className="flex justify-end pb-3 mt-4 mb-6">
                <button><FaChevronLeft size={15}
                    onClick={() => setPage(page - 1)}
                /></button>
                <p className="mx-3">1</p>
                <p className="mx-3">2</p>
                <p className="mx-3">3</p>
                <button><FaChevronRight size={15}
                    onClick={() => setPage(page + 1)}
                /></button>
            </div>
        </div>
    )
}

export default TablaGeneral
