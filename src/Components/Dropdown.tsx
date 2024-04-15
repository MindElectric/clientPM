import { motion } from "framer-motion"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { useUrlParams } from "../store"



const Dropdown = ({ dropTitle, data }: { dropTitle: string, data?: any[] }) => {
    const [isOpen, setIsOpen] = useState(false)

    const setLimit = useUrlParams((state) => state.setLimit)

    return (
        <div className="flex flex-col">
            <button title="Dropdown" className="flex items-center justify-between p-2 w-28 bg-customTextbox"
                onClick={() => setIsOpen(!isOpen)}
            >
                {dropTitle}
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
                className="absolute flex flex-col items-start w-16 mt-12 overflow-hidden rounded-lg bg-customTextbox min-w-10"
            >
                {
                    data &&
                    data.flatMap(val => val.data).map((item, index) => (
                        <div
                            key={index}
                            className="w-full p-2 rounded-lg cursor-pointer hover:bg-slate-300"
                            onClick={() => {
                                setLimit(item)
                                setIsOpen(false)
                            }}
                        >
                            <p className="text-black">{isOpen && item} </p>
                        </div>
                    ))
                }
            </motion.div>

        </div>
    )
}

export default Dropdown
