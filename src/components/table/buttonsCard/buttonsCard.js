import React from 'react';
import {Button, Icon} from "react-materialize";
import styles from "./buttonsCard.module.css";

const ButtonsCard = () => {

    return (
        <div className={styles.buttons_card_wrapper}>
            <Button
                floating
                small
                className={"red " + styles.btn_card}
                waves="light"
                icon={<Icon>close</Icon>}
            />
            <Button
                floating
                small
                className={"blue " + styles.btn_card}
                waves="light"
                icon={<Icon>create</Icon>}
            />
        </div>
    )
}

export default ButtonsCard;