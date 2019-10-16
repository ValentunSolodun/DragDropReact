import TaskStatuses from "../components/taskStatuses/taskStatuses";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
// import { getBoards } from '../actions/table'
import {toggleSelect, removeStatusFromTaskStatuses} from '../actions/taskStatuses';
import {getDraggableStatuses} from '../actions/dragdrop';
import {getStatuses} from "../actions/table";

let taskStatusesSelector = createSelector(
  state => state.statuses,
  statuses => statuses
);

const mapStateToProps = (state, args) => ({
  items: taskStatusesSelector(state),
  taskStatuses: state.taskStatuses,
  project_id: args.match.params.id
})

const mapDispatchToProps = (dispatch, args) => {
  dispatch({type: "CHANGED_PATH_TASKS", payload: {id_1: args.match.params.id}});
  dispatch(getDraggableStatuses(args.match.params.id));
  dispatch(getStatuses(args.match.params.id));
  return {
    toggleSelect: (showSelect) => dispatch(toggleSelect(showSelect)),
    removeStatus: (indexStatus, idStatus, project_id) => dispatch(removeStatusFromTaskStatuses(indexStatus, idStatus, project_id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskStatuses)