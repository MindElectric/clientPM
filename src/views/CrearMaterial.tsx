import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select';
import { useAreaStore, useCategoriaStore, useMarcaStore, useProveedorStore } from "../store/store"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMaterial } from "../services/materialService";
import { createMaterialSchema } from "../types/tFormMaterial"
import { MaterialFields } from "../types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearMaterial = () => {
    const [loading, setLoading] = useState(true);
    const fetchCategorias = useCategoriaStore((state) => state.fetchCategorias)
    const categorias = useCategoriaStore((state) => state.categorias)

    const fetchMarcas = useMarcaStore((state) => state.fetchMarcas)
    const marcas = useMarcaStore((state) => state.marcas)

    const fetchAreas = useAreaStore((state) => state.fetchAreas)
    const areas = useAreaStore((state) => state.areas)

    const fetchProveedores = useProveedorStore((state) => state.fetchProveedores)
    const proveedores = useProveedorStore((state) => state.proveedores)

    //Load data
    useEffect(() => {
        try {
            Promise.all([
                fetchCategorias(),
                fetchMarcas(),
                fetchAreas(),
                fetchProveedores()
            ]).then(() => setLoading(false));
        } catch (error) {
            toast.error("Hubo un error recibiendo informacion")
        }
    }, [])

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<MaterialFields>({ resolver: zodResolver(createMaterialSchema) })

    const onSubmit: SubmitHandler<MaterialFields> = async (data) => {
        await addMaterial(data)
        reset({
            descripcion: '',
            codigo: '',
            cantidad: 0,
            costo: "",
            maximo: 0,
            minimo: 0,
            id_marca: null,
            id_area: null,
            id_categoria_material: null,
            proveedores: null,
            // Add other fields as necessary
        });
    }

    return (
        <div>
            <ToastContainer />
            {/*TODO: Add spinner on load*/}
            {loading ? <h1>Loading...</h1> :
                <form className="flex flex-col "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="px-10 py-10 rounded-lg bg-customTextbox">

                        {/* First row */}
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <label htmlFor="descripcion" className="mb-1 ml-1 text-lg">Descripción</label>
                                <input
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripcion del material"
                                    className="h-10 pl-2 border-2 rounded-xl w-60 hover:border-black"
                                    {...register("descripcion")}
                                />
                                {errors.descripcion && (
                                    <p className="mt-1 text-xs text-red-500">{errors.descripcion.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="codigo" className="mb-1 ml-1 text-lg">Código</label>
                                <input
                                    id="codigo"
                                    type="text"
                                    placeholder="Código del material"
                                    className="h-10 pl-2 border-2 rounded-xl w-60"
                                    {...register("codigo")}
                                />
                                {errors.codigo && (
                                    <p className="mt-1 text-xs text-red-500">{errors.codigo.message}</p>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col mr-5">
                                    <label htmlFor="cantidad" className="mb-1 ml-1 text-lg">Cantidad</label>
                                    <input

                                        id="cantidad"
                                        type="number"
                                        placeholder="Ej.: 3"
                                        defaultValue={0}
                                        className="h-10 pl-2 mr-10 border-2 w-28 rounded-xl"
                                        {...register("cantidad", {
                                            valueAsNumber: true
                                        })}
                                    />
                                    {errors.cantidad && (
                                        <p className="mt-1 text-xs text-red-500">{errors.cantidad.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="costo" className="mb-1 ml-1 text-lg">Costo</label>
                                    <input
                                        id="costo"
                                        type="number"
                                        defaultValue={0}
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
                        <div className="flex justify-between mt-10">
                            <div className="flex flex-col">
                                <label htmlFor="marca" className="mb-1 ml-1 text-lg">Marca</label>
                                <Controller
                                    name="id_marca"
                                    control={control}

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
                            <div className="flex flex-col">
                                <label htmlFor="area" className="mb-1 ml-1 text-lg">Area</label>
                                <Controller
                                    name="id_area"
                                    control={control}
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
                                        defaultValue={0}
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
                                <div className="flex flex-col">
                                    <label htmlFor="minimo" className="mb-1 ml-1 text-lg">Mínimo</label>
                                    <input
                                        id="minimo"
                                        type="number"
                                        defaultValue={0}
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
                        <div className="mt-10">
                            <label htmlFor="categoria" className="mb-1 ml-1 text-lg">Categoria</label>
                            <Controller
                                name="id_categoria_material"
                                control={control}
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
                        {/* Fourth row */}
                        <div className="mt-10">
                            <div className="flex flex-col">
                                <label htmlFor="proveedor" className="mb-1 ml-1 text-lg">Proveedores</label>
                                <Controller
                                    name="proveedores"
                                    control={control}
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
                    <div className="flex justify-end mt-5">
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

export default CrearMaterial
