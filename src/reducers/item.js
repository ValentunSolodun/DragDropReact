const initialeState = { name: "", description: "" };

const item = (state = initialeState, action) => {
    switch (action.type) {
        case "SETSTATE" :
            return { ...state, name: action.payload.values.name, description: action.payload.values.description }
        case "INPUTTING" :
            if(action.payload.field == "name") {
                return {...state, name: action.payload.value}
            }else if(action.payload.field == "description"){
                return {...state, description: action.payload.value}
            }
        default:
            return state;
    }
}

export default item;