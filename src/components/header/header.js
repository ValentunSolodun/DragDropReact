import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

import styles from './Header.module.css';

const Header = () => {
    return (
        <Navbar alignLinks="left">
            <NavLink exact activeClassName={styles.active} to='/'>
                Projects
            </NavLink>
            <NavLink activeClassName={styles.active} className={styles.disabled} to="/project">
                Tasks
            </NavLink>
            <NavLink activeClassName={styles.active} className={styles.disabled} to="/status">
                Status
            </NavLink>
            <NavLink activeClassName={styles.active} className={styles.disabled} to="/status_tasks">
                Status tasks
            </NavLink>
        </Navbar>
    );
};

export default Header;