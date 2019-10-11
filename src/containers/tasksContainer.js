import Tables from '../components/table/table';
import {connect} from 'react-redux';
import {getStatuses, getTasks} from '../actions/table';
import CardTask from "../components/table/cardTask";
import {createSelector} from 'reselect';

let tasksSelector = createSelector(
  state => state.tasks,
  (tasks) => tasks
);

const mapStateToProps = (state, args) => {
  return {
    items: tasksSelector(state),
    colorsStatus: state.statuses,
    Container: CardTask,
    type: "tasks",
    project_id: args.match.params.id
  }
};

const mapDispatchToProps = (dispatch, args) => {
  dispatch(getStatuses(args.match.params.id));
  dispatch(getTasks(args.match.params.id));
  dispatch({type: "CHANGED_PATH_TASKS", payload: {id_1: args.match.params.id}})
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)