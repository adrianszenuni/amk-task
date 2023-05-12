import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <nav className={classes.navigation}>
                <ul>
                    <li><NavLink to="/">Task Management</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;