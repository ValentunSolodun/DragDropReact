import {Select} from "react-materialize";
import React from "react";
import {connect} from "react-redux";

const SelectStatus = (props) => {
  let {
    statuses,
    Field,
    onInputValue,
    selected,
    index_select,
    allStatuses
  } = props;

  // function getFilteredSelected() {
  //   let prevSelect = allStatuses[index_select - 1];
  //   if( prevSelect ) {
  //     statuses.forEach((item, i) => item.name === prevSelect.name ? statuses.splice(i, 1) : false)
  //   }
  // }
  //
  // getFilteredSelected();

  return (
    <Select onChange={(e) => onInputValue(Field, statuses[e.target.defaultValue || e.target.value], index_select)}
            id={'status_item'}>
      {statuses.map((item, i) => <option selected={item.name === selected.name}
                                         defaultValue={i} value={i}>{item.name}</option>)}
    </Select>
  )
}

const mapDispatchToProps = dispatch => ({
  onInputValue: (field, item, index) => dispatch({
    type: "INPUTTINGITEM",
    payload: {field: field, item: item, index: index}
  })
});

const mapStateToProps = state => ({
  statuses: state.statuses,
  item: state.item
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatus);