import React from 'react';
import {connect} from 'react-redux';

const MyInput = (props) => {

  let {
    MyStyle,
    Type,
    DefaultValue,
    Field,
    onInputValue
  } = props

  return (
    <input style={MyStyle} type={Type} defaultValue={DefaultValue}
           onInput={(e) => onInputValue(Field, e.target.value)}/>
  )
}

const mapStateToProps = state => ({
  item: state.item
});

const mapDispatchToProps = dispatch => ({
  onInputValue: (field, value) => dispatch({type: "INPUTTINGITEM", payload: {field: field, value: value}})
});

export default connect(mapStateToProps, mapDispatchToProps)(MyInput);

