const initialeState = [];

const tasks = (state = initialeState, action) => {
    switch (action.type) {
        case "RESULTGETTASKS":
            return [
                ...state,
                ...action.payload
            ]
        default:
            return state;
    }
}

export default tasks;