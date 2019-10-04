import React from 'react';

const SingleTask = (props) => {

    let {item} = props;

    return (
        <div>
            {item.map(item => <h1>{item.name}</h1>)}
        </div>
    )
}

export default SingleTask;