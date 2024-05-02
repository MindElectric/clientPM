import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select';
import { useAreaStore, useCategoriaStore, useMarcaStore, useProveedorStore } from "../store/store"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMaterialSchema } from "../types/tFormMaterial"
import { MaterialFields } from "../types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom"
import { useUpdateMaterial } from "../services/materialService";
import { useGetCategoriaMaterial } from "../services/CategoriaService";
import { useGetMarca } from "../services/marcaService";
import { useGetArea } from "../services/areaService";
import { useGetProveedores } from "../services/ProveedoresService";

const EditMaterial = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const getCategoriaMaterial = useGetCategoriaMaterial();
    const setCategorias = useCategoriaStore((state) => state.setCategorias)
    const categorias = useCategoriaStore((state) => state.categorias)

    const getMarca = useGetMarca();
    const setMarcas = useMarcaStore((state) => state.setMarcas)
    const marcas = useMarcaStore((state) => state.marcas)

    const getAreas = useGetArea();
    const setAreas = useAreaStore((state) => state.setAreas)
    const areas = useAreaStore((state) => state.areas)

    const getProveedores = useGetProveedores();
    const setProveedores = useProveedorStore((state) => state.setProveedores);
    const proveedores = useProveedorStore((state) => state.proveedores);

    const updateMaterial = useUpdateMaterial()

    const { state } = useLocation()

    //console.log(state)

    //Load data
    useEffect(() => {
        try {
            Promise.all([
                getCategoriaMaterial().then(data => {
                    setCategorias(data);
                }),
                getMarca().then(data => {
                    setMarcas(data);
                }),
                getAreas().then(data => {
                    setAreas(data);
                }),
                getProveedores().then(data => {
                    setProveedores(data);
                }),
            ]).then(() => setLoading(false));
        } catch (error) {
            toast.error("Hubo un error recibiendo informacion")
            navigate('/', { state: { from: location }, replace: true });
        }
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<MaterialFields>({ resolver: zodResolver(createMaterialSchema) })

    const onSubmit: SubmitHandler<MaterialFields> = async (data) => {
        await updateMaterial(state.material.id, data)

    }

    return (
        <div>
            <ToastContainer />
            {/*TODO: Add spinner on load*/}
            {loading ? <h1>Loading...</h1> :
                <form className="flex flex-col "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="px-10 py-10 rounded-lg bg-customTextbox sm:mr-10 lg:mr-0">

                        {/* First row */}
                        <div className="justify-between sm:block lg:flex">
                            <div className="flex flex-col sm:mb-5 lg:mb-0">
                                <label htmlFor="descripcion" className="mb-1 ml-1 text-lg">Descripción</label>
                                <input
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripcion del material"
                                    className="h-10 pl-2 border-2 rounded-xl w-60 hover:border-black"
                                    defaultValue={state.material.descripcion}
                                    {...register("descripcion")}
                                />
                                {errors.descripcion && (
                                    <p className="mt-1 text-xs text-red-500">{errors.descripcion.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col sm:mb-5 lg:mb-0">
                                <label htmlFor="codigo" className="mb-1 ml-1 text-lg">Código</label>
                                <input
                                    id="codigo"
                                    type="text"
                                    placeholder="Código del material"
                                    className="h-10 pl-2 border-2 rounded-xl w-60"
                                    defaultValue={state.material.codigo}
                                    {...register("codigo")}
                                />
                                {errors.codigo && (
                                    <p className="mt-1 text-xs text-red-500">{errors.codigo.message}</p>
                                )}
                            </div>
                            <div className="flex justify-between sm:mb-5 lg:mb-0">
                                <div className="flex flex-col mr-5">
                                    <label htmlFor="cantidad" className="mb-1 ml-1 text-lg">Cantidad</label>
                                    <input

                                        id="cantidad"
                                        type="number"
                                        step={0.1}
                                        placeholder="Ej.: 3"
                                        defaultValue={state.material.cantidad}
                                        className="h-10 pl-2 mr-10 border-2 w-28 rounded-xl"
                                        {...register("cantidad", {
                                            valueAsNumber: true
                                        })}
                                    />
                                    {errors.cantidad && (
                                        <p className="mt-1 text-xs text-red-500">{errors.cantidad.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col sm:mr-20 lg:mr-0">
                                    <label htmlFor="costo" className="mb-1 ml-1 text-lg">Costo</label>
                                    <input
                                        id="costo"
                                        type="number"
                                        step={0.01}
                                        defaultValue={state.material.costo}
                                        placeholder="Ej.: 100"
                                        className="h-10 pl-2 border-2 w-28 rounded-xl"
                                        {...register("costo")}
                                    />
                                    {errors.costo && (
                                        <p className="mt-1 text-xs text-red-500">{errors.costo.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        {/* Second Row */}
                        <div className="justify-between mt-10 sm:block lg:flex">
                            <div className="flex flex-col sm:mb-5 lg:mb-0">
                                <label htmlFor="marca" className="mb-1 ml-1 text-lg">Marca</label>
                                <Controller
                                    name="id_marca"
                                    control={control}
                                    defaultValue={{ value: state.material.marca.id, label: state.material.marca.nombre }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="marca"
                                            isClearable
                                            options={(marcas?.data || []).map((option: { id: number; nombre: string; }) => ({
                                                value: option.id,
                                                label: option.nombre
                                            }))}
                                            className="w-60"
                                        />
                                    )}
                                />
                                {errors.id_marca && (
                                    <p className="mt-1 text-xs text-red-500">{errors.id_marca.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col sm:mb-5 lg:mb-0">
                                <label htmlFor="area" className="mb-1 ml-1 text-lg">Area</label>
                                <Controller
                                    name="id_area"
                                    control={control}
                                    defaultValue={{ value: state.material.area.id, label: state.material.area.nombre }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="area"
                                            name="area"
                                            isClearable
                                            // defaultValue={areas?.data[0].nombre}
                                            // isDisabled={true}
                                            options={(areas?.data || []).map((option: { id: number; nombre: string; }) => ({
                                                value: option.id,
                                                label: option.nombre
                                            }))}
                                            className="w-60"
                                        />
                                    )}

                                />
                                {errors.id_area && (
                                    <p className="mt-1 text-xs text-red-500">{errors.id_area.message}</p>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col mr-5">
                                    <label htmlFor="maximo" className="mb-1 ml-1 text-lg">Máximo</label>
                                    <input
                                        id="maximo"
                                        type="number"
                                        defaultValue={state.material.maximo}
                                        placeholder="Ej.: 20"
                                        className="h-10 pl-2 mr-10 border-2 w-28 rounded-xl"
                                        {...register("maximo", {
                                            valueAsNumber: true
                                        })}
                                    />
                                    {errors.maximo && (
                                        <p className="mt-1 text-xs text-red-500">{errors.maximo.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col sm:mr-20 lg:mr-0">
                                    <label htmlFor="minimo" className="mb-1 ml-1 text-lg">Mínimo</label>
                                    <input
                                        id="minimo"
                                        type="number"
                                        defaultValue={state.material.minimo}
                                        placeholder="Ej.: 5"
                                        className="h-10 pl-2 border-2 w-28 rounded-xl"
                                        {...register("minimo", {
                                            valueAsNumber: true
                                        })}
                                    />
                                    {errors.minimo && (
                                        <p className="mt-1 text-xs text-red-500">{errors.minimo.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Third Row */}
                        <div className="flex justify-start mt-10">
                            <div className="flex flex-col mr-20">
                                <label htmlFor="categoria" className="mb-1 ml-1 text-lg">Categoria</label>
                                <Controller
                                    name="id_categoria_material"
                                    control={control}
                                    defaultValue={{ value: state.material.categoriaMaterial.id, label: state.material.categoriaMaterial.nombre }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="categoria"
                                            name="categoria"
                                            isClearable
                                            options={(categorias?.data || []).map((option: { id: number; nombre: string; }) => ({
                                                value: option.id,
                                                label: option.nombre
                                            }))}
                                            className="w-60"
                                        />
                                    )}
                                />
                                {errors.id_categoria_material && (
                                    <p className="mt-1 text-xs text-red-500">{errors.id_categoria_material.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="modelo" className="mb-1 ml-1 text-lg">Modelo (Opcional)</label>
                                <input
                                    id="modelo"
                                    type="text"
                                    defaultValue={state.material.modelo}
                                    className="w-40 h-10 pl-2 border-2 rounded-xl"
                                    {...register("modelo")}
                                />
                                {errors.modelo && (
                                    <p className="mt-1 text-xs text-red-500">{errors.modelo.message}</p>
                                )}
                            </div>
                        </div>
                        {/* Fourth row */}
                        <div className="mt-10">
                            <div className="flex flex-col">
                                <label htmlFor="proveedor" className="mb-1 ml-1 text-lg">Proveedores</label>
                                <Controller
                                    name="proveedores"
                                    control={control}
                                    // Map through all the values of proveedores to display all the selected ones
                                    defaultValue={state.material.proveedores.map((proveedor: { id: number; nombre: string; }) => ({ value: proveedor.id, label: proveedor.nombre }))}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="proveedor"
                                            name="proveedor"
                                            isMulti
                                            options={(proveedores?.data || []).map((option: { id: number; nombre: string; }) => ({
                                                value: option.id,
                                                label: option.nombre
                                            }))}
                                            className="w-9/12"
                                        />
                                    )}
                                />
                                {errors.proveedores && (
                                    <p className="mt-1 text-xs text-red-500">{errors.proveedores.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-5 sm:justify-center lg:justify-end sm:mb-10">
                        <input
                            id="submit-material"
                            type="submit"
                            className="p-3 font-bold w-28 text-customBackground bg-customPrimary rounded-xl hover:bg-customPrimary-200 hover:cursor-pointer "
                            value={isSubmitting ? 'Guardando cambios' : "Aceptar"}
                        />
                    </div>
                </form>
            }
        </div>
    )
}

export default EditMaterial
