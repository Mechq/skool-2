import {Link, useMatch, useResolvedPath} from 'react-router-dom';
import {useState} from 'react';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white text-black border-b border-gray-200 px-2 sm:px-4 py-2.5 shadow">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo-200x65.png"
                         alt="Logo" className="self-center h-10"/>
                </Link>
                <div className="flex items-center md:hidden">
                    <button
                        id="menu-toggle"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <CustomLink to="/workshops">Workshops</CustomLink>
                        <CustomLink to="/mailTemplates">Mail Templates</CustomLink>
                        <CustomLink to="/opdracht">Opdrachten</CustomLink>
                        <CustomLink to="/werklocatie">Locaties</CustomLink>
                        <CustomLink to="/customers">Klanten</CustomLink>
                        <CustomLink to="/profile">Profile</CustomLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return (
        <li className={isActive ? 'text-[#F49700]' : 'text-gray-700'}>
            <Link
                to={to}
                {...props}
                className="block py-2 pr-4 pl-3 hover:text-[#F49700] hover:underline md:hover:bg-transparent md:border-0 md:p-0"
            >
                {children}
            </Link>
        </li>
    );
}

export default NavBar;
