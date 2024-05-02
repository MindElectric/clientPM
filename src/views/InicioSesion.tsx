
import LoginFormulario from "../Components/LoginFormulario"
import business from "../assets/business.webp"




const InicioSesion = () => {


    return (
        <main>
            <div className="flex h-screen sm:justify-center sm:mb-5 md:mb-0">
                <div className="flex flex-col items-center justify-start w-1/2 h-screen">
                    <div className="my-24 text-4xl font-normal ">
                        Iniciar Sesion
                    </div>
                    <LoginFormulario />
                </div>
                <div className="bg-customPrimary h-screen w-1/2 rounded-l-[3rem] sm:hidden md:inline-block">
                    <div className="mt-24 text-4xl font-bold text-center text-black">
                        Bienvenido
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <img alt="Work-image" src={business} height={450} width={450} />
                    </div>
                </div>

            </div>

        </main>
    )
}

export default InicioSesion
