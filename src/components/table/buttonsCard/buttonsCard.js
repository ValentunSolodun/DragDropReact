import React from 'react';
import {Button, Icon} from "react-materialize";
import styles from "./buttonsCard.module.css";
import { connect } from 'react-redux';
import { removeItem, updateItem, cancelUpdate , updateItemSend} from "../../../actions/table";

const ButtonsCard = (props) => {

    let {
        removeSingle,
        updateSingle,
        cancelEditingSingle,
        updateSingleSend,
        values,
        actionTo,
        editingBtn,
        actionWhat,
        index
    } = props;

    if(editingBtn === true) {
        return (
            <div className={styles.buttons_card_wrapper + " " + styles.animation_tr}>
                <Button
                    floating
                    small
                    className={"red " + styles.btn_card}
                    waves="light"
                    onClick={ (e) => {e.preventDefault(); cancelEditingSingle(index)}}
                    icon={<Icon>close</Icon>}
                />
                <Button
                    floating
                    small
                    className={"blue " + styles.btn_card}
                    waves="light"
                    onClick={ (e) => {e.preventDefault(); updateSingleSend(actionWhat, index, values) }}
                    icon={<Icon tiny>check</Icon>}
                />
            </div>
        )
    }else  {
        return (
            <div className={styles.buttons_card_wrapper}>
                <Button
                    floating
                    small
                    className={"red " + styles.btn_card}
                    waves="light"
                    icon={<Icon>delete</Icon>}
                    onClick={(e) => {e.preventDefault(); removeSingle(actionWhat, index, actionTo)}}
                />
                <Button
                    floating
                    small
                    className={"blue " + styles.btn_card}
                    waves="light"
                    onClick={(e) => { e.preventDefault(); updateSingle(actionWhat, index, values, actionTo);}}
                    icon={<Icon>create</Icon>}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  values: state.item
});

const mapDispatchToProps = (dispatch) => {

    return {
       removeSingle: (item, index, actionTo) => dispatch(removeItem(item, index, actionTo)),
       updateSingle: (item, index, values, actionTo) => {
           dispatch({type: "SETSTATEITEM", payload: item });
           return dispatch(updateItem(item, index, actionTo));
       },
       cancelEditingSingle: index => dispatch(cancelUpdate(index)),
       updateSingleSend: (item, index, values) => dispatch(updateItemSend(item, index, values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsCard)