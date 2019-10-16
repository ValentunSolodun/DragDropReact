import {Card} from "react-materialize";
import styles from "./Table.module.css";
import MyInput from "../myInput/myInput";
import ButtonsCard from "./buttonsCard/buttonsCard";
import React, {Component} from 'react';

class CardStatus extends Component {
  render() {
    let {
      item,
      i,
      type
    } = this.props;

    return (
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
  }
}

export default CardStatus