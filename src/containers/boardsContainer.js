import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getBoards } from '../actions/table';
import { createSelector } from 'reselect';
import CardProject from "../components/table/cardProject";

let boardsSelector = createSelector(
    state => state.boards,
    boards => boards
);

const mapStateToProps = state => ({
    items: boardsSelector(state),
    Container: CardProject,
    type : 'project'
})

const mapDispatchToProps = dispatch => {
    dispatch(getBoards());
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)