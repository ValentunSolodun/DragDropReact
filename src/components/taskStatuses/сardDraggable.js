import { Card } from 'react-materialize';
import styles from "./taskStatuses.module.css";
import React, {Component} from "react";
import { DragSource } from 'react-dnd-cjs';

class CardDraggable extends Component {
  render() {

    let {item, connectDragSource} = this.props

    return connectDragSource(
      <div>
        <Card className={styles.tasks_wrapper}>
          <span className={styles.task_name_label}>{item.name}</span>
        </Card>
      </div>
    )
  }
}

const taskSource = {
  beginDrag(props) {
    // console.log(props);
    return {
      taskItem: {
        ...props.item
      },
      idStatus: props.idStatus,
      indexTask: props.indexTask,
      indexStatus: props.indexStatus
    }
  },
  endDrag() {

  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

CardDraggable = DragSource("task", taskSource, collect)(CardDraggable)

export default CardDraggable;
