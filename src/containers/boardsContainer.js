import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getBoards } from '../actions/table';
import { createSelector } from 'reselect';

let boardsSelector = createSelector(
    state => state.tables.boards,
    boards => boards
);

const mapStateToProps = state => ({
    boards: boardsSelector(state),
    labelHead : ['Name board','Actions']
})

const mapDispatchToProps = dispatch => {
    dispatch(getBoards());
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)