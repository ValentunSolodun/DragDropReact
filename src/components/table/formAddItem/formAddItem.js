import React from 'react';
import { connect } from 'react-redux';
import { TextInput, Select, Button, Icon} from 'react-materialize';
import { addItem, getStatuses } from "../../../actions/table";
import styles from './formAddItem.module.css'

const FromAddItem = (props) => {
    let { add, type, statuses, url_id } = props;
    return (
        <div className="form_add_wrapper">
            <form onSubmit={(e) => add(e, type, url_id)} className={styles.form_add_item}>
                <TextInput id="name_item" placeholder="Name" />
                {type === 'project' ? (
                    <TextInput id="desc_item" placeholder="Description" />
                    ) : null}
                {type === 'tasks' ? (
                    <Select values={''} id={'status_item'}>
                        {statuses.map(item => <option value={item.name}>{item.name}</option>) }
                    </Select>
                ) : null}
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
    statuses: state.statuses
});

const mapDispatchToProps = dispatch => {
    dispatch(getStatuses());
    return {
        add: (e, type, url_id) => dispatch(addItem(e, type, url_id))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(FromAddItem);