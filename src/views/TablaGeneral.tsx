import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router-dom'

import Select from 'react-select';
import GeneralTable from "../Components/GeneralTable"
import { useCategoriaStore, useMarcaStore, useMaterialsStore, useUrlParams } from "../store/store"
import { useEffect } from "react"
import ReactPaginate from "react-paginate"
import Dropdown from "../Components/Dropdown"
import CategoryDropdown from "../Components/CategoryDropdown"
import { useGetCategoriaMaterial } from "../services/CategoriaService"
import { useGetMaterial } from "../services/materialService"
import { useGetMarca } from "../services/marcaService"

type Data = {
    selected: number
}

const TablaGeneral = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getMaterial = useGetMaterial();
    const setMateriales = useMaterialsStore((state) => state.setMateriales)

    const pageCount = useMaterialsStore((state) => state.pageCount)
    const setPageCount = useMaterialsStore((state) => state.setPageCount)

    const getCategoriaMaterial = useGetCategoriaMaterial();
    const setCategorias = useCategoriaStore((state) => state.setCategorias)
    const categorias = useCategoriaStore((state) => state.categorias)

    const page = useUrlParams((state) => state.page)
    const setPage = useUrlParams((state) => state.setPage)


    const search = useUrlParams((state) => state.search)
    const setSearch = useUrlParams((state) => state.setSearch);

    const max = useUrlParams((state) => state.max);
    const setMax = useUrlParams((state) => state.setMax);

    const min = useUrlParams((state) => state.min);
    const setMin = useUrlParams((state) => state.setMin);

    const getMarca = useGetMarca();
    const setMarca = useMarcaStore((state) => state.setMarcas);
    const marcas = useMarcaStore((state) => state.marcas)


    const category = useUrlParams((state) => state.category)
    const marca = useUrlParams((state) => state.marca)
    const setUrlMarca = useUrlParams((state) => state.setMarca)
    const limit = useUrlParams((state) => state.limit)




    // useEffect(() => {
    //     fetchCategorias()
    // }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const responseMaterial = await getCategoriaMaterial();
                setCategorias(responseMaterial)

                const responseMarca = await getMarca()
                setMarca(responseMarca)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, []);



    // useEffect(() => {
    //     fetchMateriales(page, limit, category, search)
    // }, [page, limit, category, search, totalCount])
    //navigate('/', { state: { from: location }, replace: true })
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getMaterial(page, limit, category, search, max, min, marca);
                setMateriales(response?.data);
                setPageCount(response?.pageCount);
                //console.log(response)
            } catch (err) {
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        fetchData()
    }, [page, limit, category, search, max, min, marca]);


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
            <div className="flex flex-wrap justify-between mb-7">
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
                    <p className="mr-2">Categoria:</p>
                    {categorias &&
                        <CategoryDropdown
                            data={categorias}
                        />
                    }

                </div>
                <div className="flex items-center ">
                    <p className="mr-2">Mostrar maximos:</p>
                    <input
                        type="checkbox"
                        checked={max}
                        onChange={() => setMax(!max)}
                    />

                </div>

                <div className="flex items-center ">
                    <p className="mr-2">Mostrar minimos:</p>
                    <input
                        type="checkbox"
                        checked={min}
                        onChange={() => setMin(!min)}
                    />
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
            <div className="flex justify-between mb-7">
                <div className="flex items-center">
                    <label htmlFor="marca-selec" className="mr-2">Marca:</label>
                    <Select
                        id="marca-select"
                        isClearable
                        options={(marcas?.data || []).map((option: { id: number; nombre: string; }) => ({
                            value: option.id,
                            label: option.nombre
                        }))}
                        className="w-52"
                        onChange={(selectedOption) => setUrlMarca(selectedOption ? selectedOption.value.toString() : '')}
                    />
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
