const initialeState = [];

const boards = (state = initialeState, action) => {
    switch (action.type) {
        case "RESULTGETBOARDS":
            return [
                ...state,
                ...action.payload
            ]
        case "RESULTADDITEM":
            return [
                ...state,
                { board_name: action.payload.name, board_description: action.payload.description, id: action.payload.id}
            ]
        case "RESULTREMOVEITEM":
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1)
            ]
        case "UPDATINGITEM":
            let newStateUpdating = [...state];
            newStateUpdating[action.objField.index].edit = true;
            return newStateUpdating;
        case "CANCELUPDATINGITEM":
            let newStateCancelUpdating = [...state];
            delete newStateCancelUpdating[action.objField.index].edit;
            return newStateCancelUpdating;
        case "RESULTUPDATEITEM" :
            console.log(action.payload)
            let newStateResultlUpdated = [...state];
            console.log(newStateResultlUpdated);
            newStateResultlUpdated[action.payload.index].board_name = action.payload.values.name;
            newStateResultlUpdated[action.payload.index].board_description = action.payload.values.description;
            delete newStateResultlUpdated[action.payload.index].edit;
            return newStateResultlUpdated;
        default:
            return state;
    }

}

export default boards;