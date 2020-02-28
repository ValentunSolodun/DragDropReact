import React from 'react';
import {connect} from 'react-redux';
import {TextInput, Select, Button, Icon} from 'react-materialize';
import {addItem} from "../../../actions/table";
import styles from './formAddItem.module.css'

const FromAddItem = (props) => {
  let {add, type, statuses, project_id} = props;
  return (
    <div className="form_add_wrapper">
      <form onSubmit={(e) => add(e, type, project_id, statuses)} className={styles.form_add_item}>
        <TextInput id="name_item" placeholder="Name"/>
        {type === 'project' ? (
          <TextInput id="desc_item" placeholder="Description"/>
        ) : null}
        {type === 'tasks' ? (
          <Select values={''} id={'status_item'}>
            {statuses.map((item, i) => <option value={i}>{item.name}</option>)}
          </Select>
        ) : null}
        {type === 'statuses' ? (
          <input id="color_item" type="color"/>
        ) : null}
        <Button type="submit" waves="light">
          Add
          <Icon right>
            add
          </Icon>
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  statuses: state.statuses
});

const mapDispatchToProps = dispatch => ({
  add: (e, type, project_id, statuses) => dispatch(addItem(e, type, project_id, statuses))
});

export default connect(mapStateToProps, mapDispatchToProps)(FromAddItem);
