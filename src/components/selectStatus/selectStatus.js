import {Select} from "react-materialize";
import React from "react";
import { connect } from "react-redux";

const SelectStatus = (props) => {
    let {
        statuses,
        Field,
        onInputValue,
        selected,
    } = props;

    return (
        <Select onChange={(e) => onInputValue(Field, e.target.value)} values={selected} id={'status_item'}>
            {statuses.map(item => <option value={item.name}>{item.name}</option>) }
        </Select>
    )
}

const mapDispatchToProps = dispatch => ({
    onInputValue: (field, value) => dispatch({ type: "INPUTTINGITEM", payload: { field: field, value: value } })
});

const mapStateToProps = state => ({
    statuses: state.statuses,
    item: state.item
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatus);