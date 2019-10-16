import React from "react";
import {Button, Icon} from 'react-materialize';
import styles from '../taskStatuses/taskStatuses.module.css';
import SelectStatus from "./selectStatus";
import CardDraggable from "./сardDraggable";
import DragTarget from "./dragTarget";

const TaskStatuses = (props) => {
  let {items, removeStatus, taskStatuses, toggleSelect, project_id} = props;

  // console.log(props);

  return (
    <div className={styles.task_statuses_page_wrapper}>
      <div className={styles.select_row}>
        {
          taskStatuses.showSelect ?
            <Button onClick={() => toggleSelect(true)} floating small className="red" waves="light"
                    icon={<Icon>clear</Icon>}/>
            :
            <Button onClick={() => toggleSelect(false)} floating small className="red" waves="light"
                    icon={<Icon>add</Icon>}/>
        }
        {
          taskStatuses.showSelect ?
            <SelectStatus project_id={project_id} items={items}/>
            :
            null
        }

      </div>
      <div className={styles.task_statuses__items}>
        {
          taskStatuses.allData.map((item, i) => <DragTarget project_id={project_id} item={item} indexStatus={i}>
            <div className={styles.wrapper_name_btn_delete}>
              <span className={styles.status_name_label}>{item.name}</span>
              <Button onClick={() => removeStatus(i, item.id, project_id)} style={{"background": "transparent", "box-shadow":"none"}}  floating small icon={<Icon>close</Icon>}/>
            </div>
            {
              item.tasksGroup.length ?
                item.tasksGroup.map((item_, i_) => <CardDraggable idStatus={item.id} indexStatus={i} indexTask={i_}
                                                                  item={item_}/>)
                :
                <div className={styles.empty_tasks_wrapper}> Drop to add</div>
            }
          </DragTarget>)

        }
      </div>
    </div>
  )
}

export default TaskStatuses;