import {Card, Select} from "react-materialize";
import styles from "./Table.module.css";
import MyInput from "../myInput/myInput";
import ButtonsCard from "./buttonsCard/buttonsCard";
import React from 'react';
import SelectStatus from '../selectStatus/selectStatus'

const CardTask = (props) => {
    let {
        item,
        i,
        type = 'tasks',
    } = props;

    return (
        <Card
            className={styles.animation_tr + " " + styles.card_my_style + " next"}
            textClassName={"white-text " + styles.card_content_my_style}
            title={ item.edit ? <MyInput Field={"name"} MyStyle={{width: 65+'%'}} Type={"text"} DefaultValue={item.name} /> : item.name}
        >
            <div className='status_task_wrapper'>
                {item.edit ? <SelectStatus /> : <div className={styles.status_task}>{item.status}</div> }
            </div>
            <div className="data_task">
                {item.edit ? <MyInput Field={"description"} Type={"text"} DefaultValue={item.description} /> :
                    <div className={styles.status_date}> { new Date(item.date).toLocaleDateString() } </div>}
            </div>
            <ButtonsCard editingBtn={item.edit} index={i} actionWhat={item} actionTo={type}/>
        </Card>
    )
}

export default CardTask;