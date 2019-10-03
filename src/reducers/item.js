const initialeState = { name: "", description: "" };

const item = (state = initialeState, action) => {
    switch (action.type) {
        case "SETSTATEITEM" :
            return { ...state, name: action.payload.name, description: action.payload.description }
        case "INPUTTINGITEM" :
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