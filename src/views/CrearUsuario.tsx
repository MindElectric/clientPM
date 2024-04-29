import { useEffect } from "react"
import { useAddUser } from "../services/userService"
import { useAreaStore, useRolsStore } from "../store/store"
import { useLocation, useNavigate } from "react-router-dom"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import Select from 'react-select';
import { UserFields } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema } from "../types/tUsers"
import { useGetRol } from "../services/rolService"
import { useGetArea } from "../services/areaService"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CrearUsuario = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getAreas = useGetArea();
    const setAreas = useAreaStore((state) => state.setAreas)
    const areas = useAreaStore((state) => state.areas)

    const getRols = useGetRol()
    const rols = useRolsStore((state) => state.rols)
    const setRols = useRolsStore((state) => state.setRols)

    const addUser = useAddUser()

    useEffect(() => {
        async function fetchData() {
            try {

                // fetch rols
                const responseRol = await getRols();
                setRols(responseRol?.data);

                const responseArea = await getAreas();
                setAreas(responseArea);

            } catch (err) {
                toast.error("Hubo un error recibiendo informacion")
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        fetchData()
    }, []);



    const {
        register,
        handleSubmit,
        control,
        //reset,
        formState: { errors, isSubmitting }
    } = useForm<UserFields>({ resolver: zodResolver(createUserSchema) })

    const onSubmit: SubmitHandler<UserFields> = async (data) => {
        console.log("Submitting data")
        await addUser(data)
    }



    return (
        <div>
            <ToastContainer />
            <form className="flex flex-col flex-wrap"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="px-10 py-10 rounded-lg bg-customTextbox">
                    {/* First row */}
                    <div className="flex flex-col">
                        <label htmlFor="nombre-usuario" className="mb-1 ml-1 text-lg">Nombre de Usuario</label>
                        <input
                            id="nombre-usuario"
                            type="text"
                            placeholder="Escribe el nombre del usuario"
                            className="h-10 pl-2 border-2 w-60 rounded-xl"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
                        )}
                    </div>
                    {/* Second row */}
                    <div className="flex flex-col mt-10">
                        <label htmlFor="contraseña-usuario" className="mb-1 ml-1 text-lg">Contraseña de Usuario</label>
                        <input
                            id="contraseña-usuario"
                            type="text"
                            placeholder="Contraseña del usuario"
                            className="h-10 pl-2 border-2 rounded-xl w-60"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    {/* Third row  */}
                    <div className="flex mt-10">
                        <div className="mr-16">
                            <div className="flex flex-col">
                                <label htmlFor="rol" className="mb-1 ml-1 text-lg">Rol</label>
                                <Controller
                                    name="id_rol"
                                    control={control}

                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="rol"
                                            isClearable
                                            options={(rols?.data || []).map((option: { id: number; nombre: string; }) => ({
                                                value: option.id,
                                                label: option.nombre
                                            }))}
                                            className="w-60"
                                        />
                                    )}
                                />
                                {errors.id_rol && (
                                    <p className="mt-1 text-xs text-red-500">{errors.id_rol.message}</p>
                                )}
                            </div>
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
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    {/* Change to SubmitBtn component */}
                    <input
                        id="submit-user"
                        type="submit"
                        className="p-3 font-bold w-28 text-customBackground bg-customPrimary rounded-xl hover:bg-customPrimary-200 hover:cursor-pointer "
                        value={isSubmitting ? 'Guardando' : "Aceptar"}
                    />
                </div>
            </form>
        </div>
    )
}

export default CrearUsuario
