import { LoaderFunctionArgs, useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { useGetArea } from "../services/areaService";
import { useAreaStore, useRolsStore } from "../store/store";
import { useGetRol } from "../services/rolService";
import { useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import { UpdateUserFields, user } from "../types";
import { updateUserSchema } from "../types/tUsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserById, useUpdateUser } from "../services/userService";

//Load users by url
export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const user = await getUserById(+params.id)
        if (!user) {
            throw new Response('', { status: 404, statusText: 'Usuario no encontrado' })
        }

        return user;
    }
}


const EditUser = () => {
    const user = useLoaderData() as user

    const navigate = useNavigate()
    const location = useLocation()

    const getAreas = useGetArea();
    const setAreas = useAreaStore((state) => state.setAreas)
    const areas = useAreaStore((state) => state.areas)

    const getRols = useGetRol()
    const rols = useRolsStore((state) => state.rols)
    const setRols = useRolsStore((state) => state.setRols)

    const updateUser = useUpdateUser()


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
    } = useForm<UpdateUserFields>({ resolver: zodResolver(updateUserSchema) })

    const onSubmit: SubmitHandler<UpdateUserFields> = async (data) => {
        console.log("Submitting data")
        await updateUser(user.id!, data)

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
                            defaultValue={user.username}
                            className="h-10 pl-2 border-2 w-60 rounded-xl"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
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
                                    defaultValue={{ value: user.rol.id, label: user.rol.nombre }}

                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="rol"
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
                                defaultValue={{ value: user.area.id, label: user.area.nombre }}

                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        id="area"
                                        name="area"
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

export default EditUser
