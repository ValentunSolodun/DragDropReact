import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getBoards } from '../actions/table';
import { createSelector } from 'reselect';

let boardsSelector = createSelector(
    state => state.boards,
    boards => boards
);

const mapStateToProps = state => ({
    items: boardsSelector(state),
    type : 'BOARDS'
})

const mapDispatchToProps = dispatch => {
    dispatch(getBoards());
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)