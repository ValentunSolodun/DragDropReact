const initialeState = [];

const tasks = (state = initialeState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case "RESULTGETTASKS":
      return [
        ...action.payload
      ]
    case "RESULTADDITEMTASKS":
      return [
        ...state,
        {
          name: action.payload.name,
          status: action.payload.status,
          date: action.payload.date,
          id: action.payload.id_insert,
          id_board: action.payload.id,
          statusesGroup: [{
            ...action.payload.status
          }]
        }
      ]
    case "RESULTADDSTATUSFORTASKS":
      const newStateAddStatus = [...state];
      // if(newStateAddStatus[action.payload.indexTask].statusesGroup.every(item => item.name !== action.payload.item.name))
      // {
        newStateAddStatus[action.payload.indexTask].statusesGroup.push({
          ...action.payload.item
        })
      // }
      return newStateAddStatus;
    case "RESULTREMOVESTATUSFORTASKS" :
      const newState = [...state]
      newState[action.payload.indexTask].statusesGroup.splice(action.payload.indexStatus, 1);
      return newState;
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
      // console.log(action.payload)
      let newStateResultlUpdated = [...state];
      newStateResultlUpdated[action.payload.index] = {
        ...action.payload.values
      }
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