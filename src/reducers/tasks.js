const initialeState = [];

const tasks = (state = initialeState, action) => {
    switch (action.type) {
        case "RESULTGETTASKS":
            return [
                ...action.payload
            ]
        case "RESULTADDITEMTASKS":
            return [
                ...state,
                { name: action.payload.name, status: action.payload.status, date: action.payload.date, id: action.payload.id}
            ]
        case "RESULTREMOVEITEMTASKS":
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1)
            ]
        case "UPDATINGITEMTASKS":
            let newStateUpdating = [...state];
            newStateUpdating[action.objField.index].edit = true;
            return newStateUpdating;
        default:
            return state;
    }
}

export default tasks;