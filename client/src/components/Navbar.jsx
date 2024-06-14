import {Link, useMatch, useResolvedPath} from 'react-router-dom';
import {useState} from 'react';
import {jwtDecode} from 'jwt-decode';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDropdownToggle = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const token = localStorage.getItem('token');
    let userRole = null;
    let userName = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role;
        userName = decodedToken.firstName + ' ' + decodedToken.lastName;
    }

    return (
        <nav className="bg-white text-black border-b border-gray-200 px-2 sm:px-6 py-2.5 shadow">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo-200x65.png"
                         alt="Logo" className="self-center h-10"/>
                </Link>
                <div className="flex items-center md:hidden">
                    <button
                        id="menu-toggle"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
                <div className={`w-full md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                    <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <CustomLink to="/workshops" userRole={userRole}>Workshops</CustomLink>

                        {userRole === 'admin' && (
                            <Dropdown
                                toggleDropdown={() => handleDropdownToggle('dropdown1')}
                                isOpen={openDropdown === 'dropdown1'}
                                label="Templates"
                                options={[
                                    {label: 'Workshop Templates', href: '/workshops'},
                                    {label: 'Mail Templates', href: '/mail-templates'},
                                ]}
                            />
                        )}

                        {userRole === 'admin' && (
                            <Dropdown
                                toggleDropdown={() => handleDropdownToggle('dropdown2')}
                                isOpen={openDropdown === 'dropdown2'}
                                label="Klant"
                                options={[
                                    {label: 'Klanten', href: '/klanten'},
                                    {label: 'Werklocaties', href: '/werklocaties'}
                                ]}
                            />
                        )}

                        <CustomLink to="/opdrachten" userRole={userRole}>Opdrachten</CustomLink>
                        <CustomLink to="/workshop-docenten" userRole={userRole}>Workshopdocenten</CustomLink>

                        <CustomLink to="/inschrijvingen" userRole={userRole}>Inschrijvingen</CustomLink>

                        <CustomLink to="/openstaande-workshops" userRole={userRole}>Aanmelden</CustomLink>
                        <CustomLink to="/uitnodigingen" userRole={userRole}>Uitnodigingen</CustomLink>
                        <CustomLink to="/profiel" userRole={userRole}>
                            <div className="flex items-center">
                                <div
                                    className="relative w-8 h-8 overflow-hidden bg-brand-orange-light rounded-full light:bg-gray-600 hover:ring-2 hover:ring-brand-orange ring-offset-2">
                                    <svg className="absolute w-10 h-10 text-brand-orange -left-1" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="ml-2">{userName}</span>
                            </div>
                        </CustomLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function CustomLink({to, children, userRole}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    const allowedRoles = {
        '/workshop-templates': ['admin'],
        '/mail-templates': ['admin'],
        '/workshop-docenten': ['admin'],
        '/werklocaties': ['admin'],
        '/klanten': ['admin'],
        '/inschrijvingen': ['admin'],
        '/workshops': ['admin'],
        '/opdrachten': ['admin'],
        '/profiel': ['admin', 'teacher'],
        '/openstaande-workshops': ['admin', 'teacher'],
        '/uitnodigingen': ['teacher']
    };

    if (allowedRoles[resolvedPath.pathname] && !allowedRoles[resolvedPath.pathname].includes(userRole)) {
        return null;
    }

    return (
        <li className={isActive ? 'text-[#F49700]' : 'text-gray-700'}>
            <Link
                to={to}
                className="block py-2 pr-4 pl-3 hover:text-[#F49700] hover:underline md:hover:bg-transparent md:border-0 md:p-0"
            >
                {children}
            </Link>
        </li>
    );
}

function Dropdown({toggleDropdown, isOpen, label, options}) {
    return (
        <li className="relative">
            <button onClick={toggleDropdown}
                    className={`flex items-center py-2 px-3 hover:underline ${isOpen ? 'text-brand-orange' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-brand-orange md:p-0 light:text-white md:light:hover:text-blue-500 light:focus:text-white light:border-gray-700 light:hover:bg-gray-700 md:light:hover:bg-transparent`}>
                {label}
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg light:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 light:text-gray-400">
                        {options.map((option, index) => (
                            <li key={index}>
                                <a href={option.href}
                                   className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">{option.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default Navbar;
