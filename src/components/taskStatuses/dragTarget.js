import React, {Component} from "react";
import styles from "./taskStatuses.module.css";
import {DropTarget} from 'react-dnd';
import { dropOnTarget } from "../../actions/dragdrop";
import { connect } from "react-redux";

class DragTarget extends Component {

  constructor(props) {
    super(props);
    let { connectDropTarget, indexStatus } = this.props;
  }

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
      indexTask: monitor.getItem().indexStatus
    }

    let itemTarget = {
      indexStatus: props.indexStatus
    }

    props.dropped(itemSource, itemTarget);

    console.log(props)
    console.log(monitor.getItem())
    console.log(component)

    // const dragIndex = monitor.getItem().index;
    // const hoverIndex = props.i;
    //
    // if (dragIndex === hoverIndex) {
    //   return;
    // }
    //
    // props.moveCard(dragIndex, hoverIndex);
    //
    // monitor.getItem().index = hoverIndex;
  }
};

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget()
});

const mapDispatchToProps = (dispatch) => ({
  dropped: (itemSource, itemTarget) =>  dispatch(dropOnTarget(itemSource, itemTarget))
});

DragTarget = DropTarget("task", statusTarget, collect)(DragTarget)
DragTarget = connect(state => [], mapDispatchToProps)(DragTarget)

export default DragTarget;