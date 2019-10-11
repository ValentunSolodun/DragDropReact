const initialeState = [];

const singleTask = (state = initialeState, action) => {
  switch (action.type) {
    case "RESULTGETSINGLETASK":
      return [
        ...action.payload
      ]
    case "UPDATINGITEMSINGLETASK":
      let newStateUpdating = [...state];
      newStateUpdating[action.objField.index].edit = true;
      return newStateUpdating;
    case "RESULTADDSTATUSFORSINGLETASKPAGE" :
      state[action.payload.indexTask].statusesGroup.push({
        id: action.payload.item.id,
        name: action.payload.item.name,
        color: action.payload.item.color,
      });
      return [...state];
    case "RESULTREMOVESTATUSFORSINGLETASKPAGE" :
      state[action.payload.indexTask].statusesGroup.splice(action.payload.indexStatus, 1);
      return [...state];
    case "RESULTUPDATEITEMSINGLETASKS" :
      console.log(action.payload)
      let newStateResultlUpdated = [...state];
      console.log(newStateResultlUpdated);
      newStateResultlUpdated[action.payload.index] = {...newStateResultlUpdated[action.payload.index], ...action.payload.values};
      delete newStateResultlUpdated[action.payload.index].edit;
      return newStateResultlUpdated;
    default :
      return state;
  }
}

export default singleTask;