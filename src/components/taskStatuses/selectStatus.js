import React from "react";
import {Select} from "react-materialize";
import {connect} from "react-redux";
import {selectedStatus} from '../../actions/taskStatuses';

const SelectStatus = (props) => {

  let {items, selectedStatus, project_id} = props;

  return (
    <Select onChange={(e) => selectedStatus(items[e.target.value], project_id)}>
      <option selected value="" defaultValue={""} disabled>
        Choose your status
      </option>
      {
        items.map((item, i) => <option value={i} defaultValue={i}>{item.name}</option>)
      }
    </Select>
  )
}

const mapDispatchToProps = (dispatch) => ({
  selectedStatus: (whatStatus, project_id) => dispatch(selectedStatus(whatStatus, project_id))
})

export default connect(state => state.boards, mapDispatchToProps)(SelectStatus);