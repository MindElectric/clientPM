
const NavSelect = ({ children: title, selected, onClick }: { children: string, selected: boolean, onClick: () => void }) => {


    return (
        <button className={`p-3 mb-5 text-base cursor-pointer rounded-2xl w-full 
        ${selected ? 'bg-white' : 'bg-transparent hover:bg-customPrimary-200 '}`}
            onClick={onClick}
        >

            {title}

        </button>
    )
}

export default NavSelect
