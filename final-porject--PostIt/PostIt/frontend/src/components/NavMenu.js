import React, {useContext, useState} from 'react';
import {Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {UserContext} from '../Store';

function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const [user] = useContext(UserContext);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container
                    light>
                <NavbarBrand tag={Link} to="/">PostIt</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    {user ? (
                        <NavLink tag={Link} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" to="/login">Logout</NavLink>
                    ) : (
                        <ul className="navbar-nav flex-grow justify-end">
                            <NavItem>
                                <NavLink tag={Link} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" to="/register">Register</NavLink>
                            </NavItem>
                        </ul>
                    )}
                </Collapse>
            </Navbar>
        </header>
    );
}

export default NavMenu;
