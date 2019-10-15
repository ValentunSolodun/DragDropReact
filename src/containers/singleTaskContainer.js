import SingleTask from "../components/singleTask/singleTask";
import {connect} from 'react-redux';
import {getSingleTask} from "../actions/singleTask";
import {getStatuses} from "../actions/table";
import {createSelector} from "reselect";

let singleTaskSelector = createSelector(
  state => state.singleTask,
  singleTask => singleTask
);

const mapDispatchToProps = (dispatch, args) => {
  dispatch(getStatuses(args.match.params.id_1));
  dispatch(getSingleTask(args.match.params.id_1, args.match.params.id_2));
  dispatch({type: 'CHANGED_PATH_SINGLE_TASK', payload: {id_1: args.match.params.id_1, id_2: args.match.params.id_2}})
  return {
    resetPathSingle: () => dispatch({type: "RESET_PATH_SINGLE"})
  };
}
const mapStateToProps = (state) => {
  return {
    item: singleTaskSelector(state)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
