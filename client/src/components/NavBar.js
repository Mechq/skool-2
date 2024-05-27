import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function NavBar() {
    const path = window.location.pathname;
    return <nav className='nav'>
        <Link to='/' className='navTitle'><span className='skool'>Skool</span> <span className='workshop'>Workshop</span></Link>
        <ul>
            <CustomLink to='/about'>About</CustomLink>
            <CustomLink to='/workshops'>Workshops</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to, children,...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default NavBar;