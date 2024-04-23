import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import GeneralTable from "../Components/GeneralTable"
import { useCategoriaStore, useMaterialsStore, useUrlParams } from "../store/store"
import { useEffect } from "react"
import ReactPaginate from "react-paginate"
import Dropdown from "../Components/Dropdown"
import CategoryDropdown from "../Components/CategoryDropdown"

type Data = {
    selected: number
}

const TablaGeneral = () => {
    const fetchMateriales = useMaterialsStore((state) => state.fetchMateriales)
    const page = useUrlParams((state) => state.page)
    const setPage = useUrlParams((state) => state.setPage)
    const limit = useUrlParams((state) => state.limit)
    const category = useUrlParams((state) => state.category)
    const search = useUrlParams((state) => state.search)
    const setSearch = useUrlParams((state) => state.setSearch);


    const totalCount = useMaterialsStore((state) => state.totalCount)
    const pageCount = useMaterialsStore((state) => state.pageCount)

    const fetchCategorias = useCategoriaStore((state) => state.fetchCategorias)
    const categorias = useCategoriaStore((state) => state.categorias)

    useEffect(() => {
        fetchCategorias()
    }, [])

    useEffect(() => {
        fetchMateriales(page, limit, category, search)
    }, [page, limit, category, search, totalCount])


    const handlePageChange = (data: Data) => {
        setPage(data.selected + 1) // Subir mas uno para igualar a la propiedad next/previous
    }


    // Datos usados para el dropdown de limite
    const limitSelects = [
        {
            data: [5, 10, 15]
        }
    ]




    return (
        <>
            <div className="flex justify-between">
                <form className="flex">
                    <button title="Buscar" className="flex items-center justify-center w-10 mr-2 bg-white border border-black rounded-lg"
                        type="submit"
                    >{<FaSearch size={18} />}</button>
                    <input id="search-by-code" className="h-10 p-5 border rounded-lg w-52"
                        type="search"
                        placeholder="Buscar por código"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                    />
                </form>
                <div className="flex items-center ">
                    <p className="mr-2">Filtrar:</p>
                    {categorias &&
                        <CategoryDropdown
                            data={categorias}
                        />
                    }

                </div>
                <div className="flex items-center">
                    <p className="mr-2">
                        Limite:
                    </p>
                    <Dropdown
                        dropTitle={`${limit}`}
                        data={limitSelects} />
                </div>
            </div>
            <div className="rounded-lg bg-customTextbox">
                <GeneralTable />
            </div>
            <div className="flex justify-end pb-3 mt-4 mb-6">
                <ReactPaginate
                    previousLabel={<FaChevronLeft size={15}

                    />}
                    nextLabel={<FaChevronRight size={15}
                    // onClick={() => setPage(page + 1)}
                    />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={"flex items-center"}
                    pageClassName={"page"}
                    pageLinkClassName="text-xs font-bold"
                    previousClassName="mr-4"
                    nextClassName="ml-4"
                    breakClassName="text-lg mx-3"
                    activeClassName={"active"}
                />
            </div>
        </>
    )
}

export default TablaGeneral
