import React from 'react';
import { connect } from 'react-redux';
import { TextInput, Button, Icon} from 'react-materialize';
import { addItem } from "../../../actions/table";
import styles from './formAddItem.module.css'

const FromAddItem = (props) => {
    let { add } = props;
    return (
        <div className="form_add_wrapper">
            <form onSubmit={add} className={styles.form_add_item}>
                <TextInput id="name_item" placeholder="Name" />
                <TextInput id="desc_item" placeholder="Description" />
                <Button type="submit" waves="light">
                    Add
                    <Icon right>
                        add
                    </Icon>
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    boards: state.boards
});

const mapDispatchToProps = dispatch => ({
   add: e => dispatch(addItem(e))
});

export default connect(mapStateToProps,mapDispatchToProps)(FromAddItem);