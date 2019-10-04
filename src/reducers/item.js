const initialeState = { name: "", description: "" };

const item = (state = initialeState, action) => {
    switch (action.type) {
        case "SETSTATEITEM" :
            return { ...state, name: action.payload.name, description: action.payload.description, status: action.payload.status, date: action.payload.date, color: action.payload.color}
        case "INPUTTINGITEM" :
            if(action.payload.field === "name") {
                return {...state, name: action.payload.value}
            }else if(action.payload.field === "description"){
                return {...state, description: action.payload.value}
            }else if(action.payload.field === "status"){
                return {...state, status: action.payload.value}
            }else if(action.payload.field === "date"){
                return {...state, date: action.payload.value}
            }else if(action.payload.field === "color"){
                return {...state, color: action.payload.value}
            }
        default:
            return state;
    }
}

export default item;