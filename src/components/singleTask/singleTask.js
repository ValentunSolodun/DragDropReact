import React from 'react';
import styles from './SingleTask.module.css';

const SingleTask = (props) => {

    let {item} = props;

    return (
        <div>
            {item.map(item => <div>
                <h2>{item.name}</h2>
                <div style={{'background':item.color}} className={styles.single_task_status}>{item.status}</div>
                <div>{new Date(item.date).toLocaleDateString()}</div>
            </div>)}
        </div>
    )
}

export default SingleTask;