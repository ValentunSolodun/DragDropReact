const initialeState = [];

const singleTask = (state = initialeState, action) => {
    switch (action.type) {
        case "RESULTGETSINGLETASK":
            return [
                ...action.payload
            ]
        default :
            return  state;
    }
}

export default singleTask;