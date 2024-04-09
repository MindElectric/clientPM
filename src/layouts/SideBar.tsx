import { Outlet } from "react-router-dom"
import fire_logo from '../assets/fire_logo.webp'
import NavSelect from "../Components/NavSelect"
import { useState } from "react";
import NavDropdown from "../Components/NavDropdown";


const SideBar = () => {
    const [selected, setSelected] = useState<string>('Tabla General');
    return (
        <div className="flex">
            <div className="w-60  bg-customPrimary rounded-r-[3rem] fixed top-0 bottom-0 lg:left-0
            overflow-y-auto">
                <div className="block">
                    <div className="flex justify-center m-5">
                        <img alt="logo-pequeños-momentos" src={fire_logo} height={100} width={100} />
                    </div>

                    <div className="mb-5">
                        {/* Selectores */}
                        <NavDropdown
                            selected={selected}
                            setSelected={setSelected}
                            label="Inventario"
                            options={['Tabla General', 'Crear Material', 'Historial']} />
                    </div>
                    <div>
                        {/* Selectores */}
                        <label className="pl-5 text-base font-bold">Administrar</label>
                        <nav className="text-black">
                            {/* Cambia automaticamente el lugar seleccionado */}
                            <NavSelect selected={selected === 'Crear usuario'} onClick={() => setSelected('Crear usuario')}>Crear usuario</NavSelect>
                            <NavSelect selected={selected === 'Administrar'} onClick={() => setSelected('Administrar')}>Administrar</NavSelect>
                        </nav>
                    </div>
                </div>
            </div>

            <main className="flex justify-center w-full ml-32">
                <Outlet />
            </main>
        </div>
    )
}

export default SideBar
