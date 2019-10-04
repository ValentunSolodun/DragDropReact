const initialeState = [];

const statuses = (state = initialeState, action) => {

    switch (action.type) {
        case "RESULTGETSTATUSES":
            return [
                ...action.payload
            ]
        case "RESULTADDITEMSTATUSES" :
            return [
                ...state,
                { name: action.payload.name, color: action.payload.color, id: action.payload.id}
            ]
        case "RESULTREMOVEITEMSTATUSES":
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1)
            ]
        case "UPDATINGITEMSTATUSES":
            let newStateUpdating = [...state];
            newStateUpdating[action.objField.index].edit = true;
            return newStateUpdating;
        case "CANCELUPDATINGITEMSTATUSES":
            let newStateCancelUpdating = [...state];
            delete newStateCancelUpdating[action.objField.index].edit;
            return newStateCancelUpdating;
        case "RESULTUPDATEITEMSTATUSES" :
            console.log(action.payload)
            let newStateResultlUpdated = [...state];
            console.log(newStateResultlUpdated);
            newStateResultlUpdated[action.payload.index].name = action.payload.values.name;
            newStateResultlUpdated[action.payload.index].color = action.payload.values.color;
            delete newStateResultlUpdated[action.payload.index].edit;
            return newStateResultlUpdated;
        default:
            return state;
    }
}

export default statuses;