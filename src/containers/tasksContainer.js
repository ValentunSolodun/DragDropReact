import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getBoards } from '../actions/table';
import { createSelector } from 'reselect';
import React from 'react';

const Test = () => {

    return (
        <h1>Test</h1>
    )
}

// let boardsSelector = createSelector(
//     state => state.tables.boards,
//     boards => boards
// );
//
// const mapStateToProps = state => ({
//     boards: boardsSelector(state),
//     labelHead : ['Name board','Actions']
// })
//
// const mapDispatchToProps = dispatch => {
//     dispatch(getBoards());
//     return {};
// }

export default Test;