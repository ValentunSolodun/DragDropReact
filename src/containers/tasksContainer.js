import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getTasks } from '../actions/table';
import { createSelector } from 'reselect';

// let tasksSelector = createSelector(
//     state => state.tasks,
//     tasks => tasks
// );

const mapStateToProps = state => {
    console.log(state);
    return {
        items: state.tasks
    }
};

const mapDispatchToProps = (dispatch, args) => {
    dispatch(getTasks(args.match.params.id));
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)