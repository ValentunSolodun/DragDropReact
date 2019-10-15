import React from "react";
import {Card, Button, Divider, Icon} from 'react-materialize';
import styles from '../taskStatuses/taskStatuses.module.css';
import SelectStatus from "./selectStatus";
import CardDraggable from "./сardDraggable";
import DragTarget from "./dragTarget";

const TaskStatuses = (props) => {
  let {items, taskStatuses, toggleSelect, project_id} = props;

  console.log(props);

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
          taskStatuses.allData.map((item, i) => <DragTarget indexStatus={i}>
            <span className={styles.status_name_label}>{item.name}</span>
            {
              item.tasksGroup.length ?
                item.tasksGroup.map((item_, i_) => <CardDraggable indexStatus={i} indexTask={i_} item={item_} />)
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