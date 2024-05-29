import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function NavBar() {
    const path = window.location.pathname;
    return <nav className='nav'>
        <Link to='/' className='navTitleImage'>
            <img src="https://skoolworkshop.nl/wp-content/uploads/2019/11/Skool_Workshop_Logo_White.png" alt="Skool Workshop"/>
        </Link>        <ul>
            <CustomLink to='/workshops'>Workshops</CustomLink>
            <CustomLink to='/mailTemplates'>Mail Templates</CustomLink>
            <CustomLink to='/opdracht'>Opdracht</CustomLink>
            <CustomLink to='/werklocatie'>Werklocatie</CustomLink>
            <CustomLink to='/customers'>Customer</CustomLink>
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