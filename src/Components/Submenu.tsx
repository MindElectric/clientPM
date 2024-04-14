import { motion } from "framer-motion"
import { useState } from "react"
import { FaChevronUp } from "react-icons/fa"
import { NavLink, useLocation } from "react-router-dom"

type Data = {
    name: string
    menus: string[]
    url: string[]
}

const Submenu = ({ data }: { data: Data }) => {
    const { pathname } = useLocation()
    const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(data.name) ? true : false)
    return (
        <>
            <li className={`link ${pathname.includes(data.name) && "bg-customAccent-200"} `}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
                <p className="flex-1 capitalize">{data.name}</p>
                <FaChevronUp size={15} className={`${subMenuOpen && 'rotate-180'} duration-200`} />
            </li>
            <motion.ul className="flex flex-col h-0 pl-10 overflow-hidden text-sm"
                animate={
                    subMenuOpen ? {
                        height: "fit-content"
                    } : {
                        height: 0
                    }
                }
            >
                {
                    data.url.map((url, index) => (
                        <li key={url}>
                            <NavLink to={url} className='capitalize bg-transparent link'>{data.menus[index]}</NavLink>
                        </li>
                    ))
                }
            </motion.ul>
        </>
    )
}

export default Submenu
