import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getTasks } from '../actions/table';
import CardTask from "../components/table/cardTask";
import { createSelector } from 'reselect';

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
        url_id: args.match.params.id
    }
};

const mapDispatchToProps = (dispatch, args) => {
    dispatch(getTasks(args.match.params.id));
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)