const initialeState = [];

const statuses = (state = initialeState, action) => {

    switch (action.type) {
        case "RESULTGETSTATUSES":
            return [
                ...action.payload
            ]
        default:
            return state;
    }
}

export default statuses;