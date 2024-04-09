import React, { useState } from 'react';
import NavSelect from './NavSelect';
import { FaChevronUp } from 'react-icons/fa';

interface NavDropdownProps {
    label: string;
    options: string[];
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, options, selected, setSelected }) => {
    const [isVisible, setIsVisible] = useState(true);

    const dropDown = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <span className="flex items-center justify-between pl-5 text-base font-bold cursor-pointer" onClick={dropDown}>
                {label}
                <i className={`mr-5 transform ${isVisible ? 'rotate-180' : ''}`}>
                    <FaChevronUp size={16} />
                </i>
            </span>
            {isVisible && (
                <nav className={`text-black transition-transform duration-500 ease-in-out transform ${isVisible ? 'scale-y-100' : 'scale-y-0'}`}>
                    {options.map(option => (
                        <NavSelect key={option} selected={selected === option} onClick={() => setSelected(option)}>{option}</NavSelect>
                    ))}
                </nav>
            )}
        </>
    );
};

export default NavDropdown;