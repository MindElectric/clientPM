import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"


// Validation
const loginSchema = z.object({
    usuario: z.string().min(10, "El usuario debe tener minimo 10 caracteres"),
    password: z.string().min(8, "Contraseña debe tener minimo 8 caracteres")
});

type FormFields = z.infer<typeof loginSchema>

const LoginFormulario = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({ resolver: zodResolver(loginSchema) })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // Validate data from server
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data)
        navigate("/tablaGeneral")
    }
    return (
        <>
            <form
                id="loginform"
                onSubmit={handleSubmit(onSubmit)}
            // className="bg-white rounded-lg shadow-md"
            >
                <div className="mb-8">
                    <label htmlFor="usuario" className="block text-2xl ">Usuario</label>
                    <input id="usuario" className="h-16 px-6 my-3 w-96 rounded-2xl"
                        {...register("usuario")}
                        type="text"
                        placeholder="Nombre de usuario"
                    />
                    {errors.usuario && (
                        <p className="text-red-500">{errors.usuario.message}</p>
                    )}
                </div>
                <div className="mb-9">

                    <label htmlFor="contraseña" className="block text-2xl">Contraseña</label>
                    <input id="contraseña" className="h-16 px-6 my-3 w-96 rounded-2xl"
                        {...register("password")}
                        type="text"
                        placeholder="Contraseña"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="flex items-center justify-center py-5 text-xl font-bold text-center cursor-pointer bg-customAccent px-11 rounded-2xl hover:bg-customAccent-200"
                        type="submit"
                        disabled={isSubmitting}

                    >
                        {isSubmitting ? "Cargando..." : `Iniciar`}
                        {!isSubmitting && <FaChevronRight size={16} />}
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginFormulario
