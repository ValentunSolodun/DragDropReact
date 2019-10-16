import React from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect'
import {Icon, Button} from "react-materialize";

const ButtonAddStatus = (props) => {

  let {addStatus, indexTask, items, Type} = props;

  return (
    <Button onClick={() => addStatus(indexTask, items[0], Type)} floating small className="red"
            style={{"margin": '0 auto'}} waves="light" icon={<Icon>add</Icon>}/>
  )
}

let tasksStatusesGroupSelector = createSelector(
  state => state.statuses,
  statuses => statuses
);

const mapDispatchToProps = dispatch => ({
  addStatus: (indexTask, item, Type) => {
    if (Type === 'singleTaskPage') {
      dispatch({type: "RESULTADDSTATUSFORSINGLETASKPAGE", payload: {indexTask: indexTask, item: item}})
    } else {
      dispatch({type: "RESULTADDSTATUSFORTASKS", payload: {indexTask: indexTask, item: item}})
    }
  }
});

const mapStateToProps = (state) => ({
  items: tasksStatusesGroupSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddStatus);