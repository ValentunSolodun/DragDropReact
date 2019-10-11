const initialeState = {};

const item = (state = initialeState, action) => {
  switch (action.type) {
    case "SETSTATEITEM" :
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        statusGroup: action.payload.statusesGroup,
        date: action.payload.date,
        color: action.payload.color
      }
    case "INPUTTINGITEM" :
      if (action.payload.field === "name") {
        return {...state, name: action.payload.value}
      } else if (action.payload.field === "description") {
        return {...state, description: action.payload.value}
      } else if (action.payload.field === "status") {
        return {...state, status: action.payload.value}
      } else if (action.payload.field === "date") {
        return {...state, date: action.payload.value}
      } else if (action.payload.field === "color") {
        return {...state, color: action.payload.value}
      } else if (action.payload.field === "statusGroup") {
        let newState = {...state};
        newState.statusGroup[action.payload.index] = {
          ...action.payload.item
        }

        return newState;
      }
      break;
    default:
      return state;
  }
}

export default item;