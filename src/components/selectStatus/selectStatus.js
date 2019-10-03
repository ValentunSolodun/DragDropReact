import {Select} from "react-materialize";
import React from "react";
import { connect } from "react-redux";


const SelectStatus = (props) => {
    let {
        statuses
    } = props;

    return (
        <Select values={''} id={'status_item'}>
            {statuses.map(item => <option value={item.name}>{item.name}</option>) }
        </Select>
    )
}

const mapStateToProps = state => ({
    statuses: state.statuses
});

export default connect(mapStateToProps)(SelectStatus);