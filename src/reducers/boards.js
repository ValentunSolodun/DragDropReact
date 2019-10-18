const initialeState = [];

const boards = (state = initialeState, action) => {
  switch (action.type) {
    case "RESULTGETBOARDS":
      return [
        ...action.payload
      ]
    case "RESULTADDITEMPROJECTS":
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description
        }
      ]
    case "RESULTREMOVEITEMPROJECTS":
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    case "UPDATINGITEMPROJECTS":
      let newStateUpdating = [...state];
      newStateUpdating[action.objField.index].edit = true;
      return newStateUpdating;
    case "CANCELUPDATINGITEMPROJECTS":
      let newStateCancelUpdating = [...state];
      delete newStateCancelUpdating[action.objField.index].edit;
      return newStateCancelUpdating;
    case "RESULTUPDATEITEMPROJECT" :
      console.log(action.payload)
      let newStateResultlUpdated = [...state];
      console.log(newStateResultlUpdated);
      newStateResultlUpdated[action.payload.index].name = action.payload.values.name;
      newStateResultlUpdated[action.payload.index].description = action.payload.values.description;
      delete newStateResultlUpdated[action.payload.index].edit;
      return newStateResultlUpdated;
    default:
      return state;
  }

}

export default boards;