import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

import styles from './Navbar.module.css';

const Header = () => {
    return (
        <Navbar alignLinks="left">
            <NavLink activeClassName={styles.active} to='/'>
                Projects
            </NavLink>
            <NavLink className={styles.disabled} to="/tasks">
                Tasks
            </NavLink>
            <NavLink className={styles.disabled} to="/status">
                Status
            </NavLink>
            <NavLink className={styles.disabled} to="/status_tasks">
                Status tasks
            </NavLink>
        </Navbar>
    );
};

export default Header;