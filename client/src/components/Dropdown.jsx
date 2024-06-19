import React, {useEffect, useRef, useState} from 'react';

function Dropdown({buttonText, options}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative hidden text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-white bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-brand-orange-light"
                type="button"
            >
                {buttonText}
                <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {isOpen && (
                <div className="z-10 w-48 bg-white rounded-lg shadow light:bg-gray-700 absolute mt-2">
                    <ul className="p-3 space-y-1 text-sm text-gray-700 light:text-gray-200">
                        {options.map((option, index) => (
                            <li key={index}>
                                <div
                                    className="flex items-center p-2 rounded hover:bg-gray-100 light:hover:bg-gray-600">
                                    <input
                                        id={`checkbox-item-${index}`}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light light:focus:ring-brand-orange-light light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${index}`}
                                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded light:text-gray-300"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
