import {Card} from "react-materialize";
import styles from "./Table.module.css";
import MyInput from "../myInput/myInput";
import ButtonsCard from "./buttonsCard/buttonsCard";
import React from 'react';

const CardProject = (props) => {
    let {
        item,
        i,
        type
    } = props;
    return (
        <Card
            style={{'background' : item.color}}
            className={styles.animation_tr + " " + styles.card_my_style + " next"}
            textClassName={"white-text " + styles.card_content_my_style}
            title={ item.edit ? <MyInput Field={"name"} MyStyle={{width: 65+'%'}} Type={"text"} DefaultValue={item.name} /> : item.name}
        >
            {item.edit ? <MyInput Field={"color"} Type={"color"} DefaultValue={item.color} /> :
                <div className={styles.status_color} style={{'background': item.color}}>{item.color}</div> }
            <ButtonsCard editingBtn={item.edit} index={i} actionWhat={item} actionTo={type}/>
        </Card>
    )
}

export default CardProject;