import {Card} from "react-materialize";
import styles from "./Table.module.css";
import MyInput from "../myInput/myInput";
import ButtonsCard from "./buttonsCard/buttonsCard";
import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';


class CardStatus extends Component {
  render() {
    let {
      item,
      i,
      type,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;

    return (connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className={styles.animation_tr}>
            <Card
              style={{'background': item.color}}
              className={styles.card_my_style + " next"}
              textClassName={"white-text " + styles.card_content_my_style}
              title={item.edit ? <MyInput Field={"name"} MyStyle={{width: 65 + '%'}} Type={"text"}
                                          DefaultValue={item.name}/> : item.name}
            >
              {item.edit ? <MyInput Field={"color"} Type={"color"} DefaultValue={item.color}/> :
                <div className={styles.status_color}
                     style={{'background': item.color}}>{item.color}</div>}
              <ButtonsCard editingBtn={item.edit} index={i} actionWhat={item} actionTo={type}/>
            </Card>
          </div>
        )
      )
    )
  }
}


const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.item.id,
      index: props.i,
    }
  },
};

const cardTarget = {
  hover(props, monitor, component) {

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.i;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
}

CardStatus = DropTarget('card', cardTarget, (connect => ({
  connectDropTarget: connect.dropTarget()
})))(CardStatus);
CardStatus = DragSource('card', cardSource, collect)(CardStatus);


export default CardStatus