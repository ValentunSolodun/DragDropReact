import React, {Component} from "react";
import styles from "./taskStatuses.module.css";
import {DropTarget} from 'react-dnd';
import { dropOnTarget } from "../../actions/dragdrop";
import { connect } from "react-redux";

class DragTarget extends Component {

  render() {
    return this.props.connectDropTarget(
      <div className={styles.statuses_wrapper}>
        {this.props.children}
      </div>
    )
  }
}

const statusTarget = {
  drop(props, monitor, component) {

    let itemSource = {
      item: monitor.getItem().taskItem,
      indexStatus: monitor.getItem().indexStatus,
      indexTask: monitor.getItem().indexTask,
      idStatus: monitor.getItem().idStatus
    }

    let itemTarget = {
      item: props.item,
      indexStatus: props.indexStatus
    }

    props.dropped(itemSource, itemTarget, props.project_id);

    console.log(itemTarget)
  }
};

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget()
});

const mapDispatchToProps = (dispatch) => ({
  dropped: (itemSource, itemTarget, project_id) =>  dispatch(dropOnTarget(itemSource, itemTarget, project_id))
});

DragTarget = DropTarget("task", statusTarget, collect)(DragTarget)
DragTarget = connect(state => ({}), mapDispatchToProps)(DragTarget)

export default DragTarget;