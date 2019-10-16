import {Card, Chip} from "react-materialize";
import styles from "./Table.module.css";
import MyInput from "../myInput/myInput";
import ButtonsCard from "./buttonsCard/buttonsCard";
import React from 'react';
import SelectStatus from '../selectStatus/selectStatus';
import ButtonAddStatus from '../buttonAddStatus/buttonAddStatus';
import ButtonRemoveStatus from '../buttonRemoveStatus/buttonRemoveStatus'

const CardTask = (props) => {
  let {
    item,
    i,
    type
  } = props;

  return (
    <Card
      className={styles.animation_tr + " " + styles.card_my_style + " next"}
      textClassName={"white-text " + styles.card_content_my_style}
      title={item.edit ? <MyInput Field={"name"} MyStyle={{width: 65 + '%'}} Type={"text"}
                                  DefaultValue={item.name}/> : item.name}
    >
      <div className='status_task_wrapper'>
        {item.edit ? <div className={styles.status_task_editing_items}>
            {item.statusesGroup.map((item_, i_) =>
              (
                <div className={styles.select_group}>
                  <SelectStatus allStatuses={item.statusesGroup} index_select={i_} selected={item_} Field={"statusGroup"}/>
                  {item.statusesGroup.length > 1 ?
                    <ButtonRemoveStatus indexStatus={i_} indexTask={i}/> : null}
                </div>
              )
            )}
            <ButtonAddStatus allStatuses={item.statusesGroup} indexTask={i}/>
          </div>
          :
          <div className={styles.status_task_items}>
            {item.statusesGroup.map(itemStatusesGroup =>
              <Chip className={styles.status_task} style={{'background': itemStatusesGroup.color}}>
                {itemStatusesGroup.name}
              </Chip>
            )
            }</div>}
      </div>
      <div className="data_task">
        {item.edit ? <MyInput Field={"date"} Type={"date"}
                              DefaultValue={new Date(item.date).toISOString().slice(0, 10)}/> :
          <div className={styles.status_date}> {new Date(item.date).toLocaleDateString()} </div>}
      </div>
      <ButtonsCard editingBtn={item.edit} index={i} actionWhat={item} actionTo={type}/>
    </Card>
  )
}

export default CardTask;