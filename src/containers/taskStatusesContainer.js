import TaskStatuses from "../components/taskStatuses/taskStatuses";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {getBoards} from '../actions/table'
import {toggleSelect} from '../actions/taskStatuses';

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
  dispatch({type: "CHANGED_PATH_TASKS", payload: {id_1: args.match.params.id}})
  return {
    toggleSelect: (showSelect) => dispatch(toggleSelect(showSelect))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskStatuses)