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
                { name: action.payload.name, status: action.payload.status, date: action.payload.date, id: action.payload.id_insert, id_board: action.payload.id}
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
        case "RESULTUPDATEITEMTASKS" :
            console.log(action.payload)
            let newStateResultlUpdated = [...state];
            console.log(newStateResultlUpdated);
            newStateResultlUpdated[action.payload.index].name = action.payload.values.name;
            newStateResultlUpdated[action.payload.index].status = action.payload.values.status;
            newStateResultlUpdated[action.payload.index].date = action.payload.values.date;
            delete newStateResultlUpdated[action.payload.index].edit;
            return newStateResultlUpdated;
        case "CANCELUPDATINGITEMTASKS":
            let newStateCancelUpdating = [...state];
            delete newStateCancelUpdating[action.objField.index].edit;
            return newStateCancelUpdating;
        default:
            return state;
    }
}

export default tasks;