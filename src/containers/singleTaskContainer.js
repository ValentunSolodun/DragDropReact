import SingleTask from "../components/singleTask/singleTask";
import {connect} from 'react-redux';
import { getSingleTask } from "../actions/singleTask";
import {createSelector} from "reselect";

let singleTaskSelector = createSelector(
    state => state.singleTask,
    singleTask => singleTask
);

const mapDispatchToProps = (dispatch, args) => {
    dispatch(getSingleTask(args.match.params.id_1, args.match.params.id_2));
    return {};
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        item: singleTaskSelector(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
