
import { useState } from 'react'
import { categoria } from '../types'
import { FaChevronDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useUrlParams } from '../store/store'


const CategoryDropdown = ({ data }: { data: categoria }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState("Todos")
    const setCategory = useUrlParams((state) => state.setCategory)
    return (
        <div className="flex flex-col">
            <button title="Dropdown" className="flex items-center justify-between p-2 w-28 bg-customTextbox"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected}
                <FaChevronDown size={10} className={`${isOpen && 'rotate-180'} duration-200`} />
            </button>


            <motion.div
                animate={
                    isOpen ? {
                        height: 'fit-content'
                    } : {
                        height: 0
                    }
                }
                initial={false}
                className="absolute flex flex-col items-start w-32 mt-12 overflow-hidden rounded-lg bg-customTextbox min-w-10"
            >
                <div
                    className="w-full p-2 rounded-lg cursor-pointer hover:bg-slate-300"
                    onClick={() => {
                        setIsOpen(false)
                        setCategory("") // Set to null or appropriate value for "All"
                        setSelected("Todos")
                    }}
                >
                    Todos
                </div>
                {
                    data.data.map(value => (
                        <div
                            key={value.id}
                            className="w-full p-2 rounded-lg cursor-pointer hover:bg-slate-300"
                            onClick={() => {
                                setIsOpen(false)
                                setCategory(value.id)
                                setSelected(value.nombre)
                            }}
                        >
                            {value.nombre}
                        </div>
                    ))
                }
            </motion.div>

        </div>
    )
}

export default CategoryDropdown
