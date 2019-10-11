import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-materialize';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import styles from './Header.module.css';

const Header = (props) => {

  let {items} = props;

  let unActive = !items.locationTasks.id_1;
  let unActiveSingle = !items.locationSingleTask.id_1 && !items.locationSingleTask.id_2;

  return (
    <Navbar alignLinks="left">
      <NavLink exact activeClassName={styles.active} to='/'>
        Projects
      </NavLink>
      <NavLink activeClassName={styles.active} exact className={ unActive ? styles.disabled : null}
               to={`/project/${items.locationTasks.id_1}`}>
        Tasks
      </NavLink>
      <NavLink activeClassName={styles.active} exact className={ unActiveSingle ? styles.disabled : null}
               to={`/project/${items.locationSingleTask.id_1}/tasks/${items.locationSingleTask.id_2}`}>
        Single task
      </NavLink>
      <NavLink activeClassName={styles.active} className={ unActive ? styles.disabled : null } exact to={`/statuses/${items.locationTasks.id_1}`}>
        Statuses
      </NavLink>
      <NavLink className={ unActive ? styles.disabled : null} activeClassName={styles.active} exact to={`/task_statuses/${items.locationTasks.id_1}`}>
        Task statuses
      </NavLink>
    </Navbar>
  );
};

const locationSelector = createSelector(
  state => state.locationPath,
  locationPath => locationPath
);

const mapStateToProps = state => ({
  items: locationSelector(state)
});

export default connect(mapStateToProps)(Header);