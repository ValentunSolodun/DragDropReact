import React from "react";
import {connect} from 'react-redux';
import {Button, Icon} from "react-materialize";

const buttonRemoveStatus = (props) => {

  let {Type, removeStatus, indexTask, indexStatus} = props;

  return (
    <Button onClick={() => removeStatus(indexTask, indexStatus, Type)} floating small className="red"
            style={{"margin": '0 auto'}} waves="light" icon={<Icon>remove</Icon>}/>
  )

}

const mapDispatchToProps = dispatch => ({
  removeStatus: (indexTask, indexStatus, Type) => {
    if (Type === 'singleTaskPage') {
      dispatch({type: "RESULTREMOVESTATUSFORSINGLETASKPAGE", payload: {indexTask: indexTask, indexStatus: indexStatus}})
    } else {
      dispatch({type: "RESULTREMOVESTATUSFORTASKS", payload: {indexTask: indexTask, indexStatus: indexStatus}})
    }
  }
});

export default connect((state) => state, mapDispatchToProps)(buttonRemoveStatus);