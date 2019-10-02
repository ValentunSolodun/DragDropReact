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
                    onClick={ () => cancelEditingSingle(index)}
                    icon={<Icon>close</Icon>}
                />
                <Button
                    floating
                    small
                    className={"blue " + styles.btn_card}
                    waves="light"
                    onClick={ () => updateSingleSend(actionWhat, index, values) }
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
                    onClick={() => removeSingle(actionWhat, index)}
                />
                <Button
                    floating
                    small
                    className={"blue " + styles.btn_card}
                    waves="light"
                    onClick={() => updateSingle(actionWhat, index, values)}
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
       removeSingle: (item, index) => dispatch(removeItem(item, index)),
       updateSingle: (item, index, values) => {
           dispatch({type: "SETSTATE", payload: {values: values}  });
           return dispatch(updateItem(item, index));
       },
       cancelEditingSingle: index => dispatch(cancelUpdate(index)),
       updateSingleSend: (item, index, values) => dispatch(updateItemSend(item, index, values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsCard)