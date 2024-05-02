import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { //useLocation, 
    useNavigate
} from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"
import { loginRequest } from "../services/userService";
import { useState } from "react";
import Error from "./Error";
import { useAuth } from "../hooks/useAuth";

// Validation
const loginSchema = z.object({
    usuario: z.string().min(5, "El usuario debe tener minimo 5 caracteres"),
    password: z.string().min(2, "Contraseña debe tener minimo 2 caracteres")
});
type FormFields = z.infer<typeof loginSchema>

const LoginFormulario = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    //const location = useLocation()
    //const from = location.state?.from?.pathname || "/"

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({ resolver: zodResolver(loginSchema) })


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // Validate data from server
        try {
            const result = await loginRequest(data.usuario, data.password)
            const accessToken: string = await result?.data.accessToken
            const rol = await result?.data.rol
            setAuth({ user: { username: data.usuario, rol }, accessToken })
            navigate("inventario/tablageneral")
            //navigate(from, { replace: true });
        } catch (err: any) {
            console.log(err.response)
            if (!err?.response) {
                setErrorMsg("Sin respuesta del servidor")
            } else if (err.response?.status === 404) {
                setErrorMsg("No autorizado")
            } else {
                setErrorMsg("Fallo inicio sesión")
            }
            setError(true)
        }
    }
    return (
        <section>
            <form
                id="loginform"
                onSubmit={handleSubmit(onSubmit)}
            // className="bg-white rounded-lg shadow-md"
            >
                {error && <Error children={errorMsg} />
                }
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
                        type="password"
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
        </section>
    )
}

export default LoginFormulario
