import React, {Component} from 'react';
import styles from './SingleTask.module.css';
import {Chip, Icon, Switch, Textarea, Button} from 'react-materialize';
import {connect} from 'react-redux';
import {updateSingleTask} from '../../actions/singleTask';
import MyInput from '../myInput/myInput';
import SelectStatus from "../selectStatus/selectStatus";
import {updateSingleTaskSend} from "../../actions/singleTask";
import ButtonAddStatus from "../buttonAddStatus/buttonAddStatus";
import ButtonRemoveStatus from "../buttonRemoveStatus/buttonRemoveStatus";

class SingleTask extends Component {

  componentWillUnmount() {
    this.props.resetPathSingle();
  }

  render() {

    let {items, updateSingleTask, values, updateSingleTaskSend} = this.props;

    return (
      <div className={styles.single_task_container}>
        {items.map((item, i) => <div className={styles.single_task_wrapper}>

          {
            item.edit ?
              <div>
                <MyInput Field={'name'} Type={'text'} DefaultValue={item.name}/>
                <MyInput Field={'description'} Type={'text'} DefaultValue={item.description}/>
                <div>
                  {item.statusesGroup.map((item, i_) =>
                    (
                      <div className={styles.select_group}>
                        <SelectStatus index_select={i_} selected={item.name} Field={"statusGroup"}/>
                        {items[i].statusesGroup.length > 1 ?
                          <ButtonRemoveStatus Type={'singleTaskPage'} indexStatus={i_} indexTask={i}/> : null}
                      </div>
                    )
                  )}
                  <ButtonAddStatus Type={'singleTaskPage'} indexStatus={item.statusesGroup[0].id} indexTask={i}/>
                </div>
                <div>
                  <MyInput Field={"date"} Type={"date"} DefaultValue={new Date(item.date).toISOString().slice(0, 10)}/>
                </div>
                <Button onClick={(e) => {
                  e.preventDefault();
                  updateSingleTaskSend(item, i, values, 'tasks')
                }} floating
                        small className={'red ' + styles.btn_action_in_task} waves="light" icon={<Icon>check</Icon>}/>
              </div>
              :
              <div>
                <h3 className={styles.single_task_name}>{item.name}</h3>
                <div className={styles.single_task_desc}>
                  {item.description}
                </div>
                <div className={styles.single_task_status_group}>
                  {item.statusesGroup.map(item => <Chip style={{"background": item.color}}>
                    {item.name}
                  </Chip>)}
                </div>
                <div className={styles.single_task_date}>
                  <Icon>date_range</Icon>
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <Button onClick={(e) => updateSingleTask(e.target, items[i])} floating small
                        className={"blue " + styles.btn_action_in_task} waves="light" icon={<Icon>edit</Icon>}/>
              </div>


          }

        </div>)}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.singleTask,
  values: state.item
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleTask: (isChecked, item) => {
      dispatch({type: "SETSTATEITEM", payload: item});
      return dispatch(updateSingleTask(isChecked))
    },
    updateSingleTaskSend: (item, index, values, actionTo) => dispatch(updateSingleTaskSend(item, index, values, actionTo))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);