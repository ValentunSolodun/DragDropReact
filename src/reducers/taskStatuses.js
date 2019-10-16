let initialeState = {showSelect: false, allData: []};

const taskStatuses = (state = initialeState, action) => {
  switch (action.type) {
    case "RESULT_GET_DRAGGABLE_STATUSES" :
      return {
        ...state,
        showSelect : false,
        allData: [
          ...action.payload
        ]
      }
    case "RESULT_GET_SELECTED_STATUS":
      return {
        ...state,
        showSelect : false,
        allData: [
          ...state.allData,
          ...action.payload
        ]
      }
    case "TOGGLE_SELECT" :
      let newState = {...state};
      newState.showSelect = !action.payload.show;
      return newState;
    case "DROP_RESULT" :
      let newStateDrop = {...state};
      newStateDrop.allData[action.payload.itemSource.indexStatus].tasksGroup.splice(action.payload.itemSource.indexTask, 1);
      // console.log(newStateDrop.allData[action.itemSource.indexStatus].tasksGroup);
      newStateDrop.allData[action.payload.itemTarget.indexStatus].tasksGroup.push({...action.payload.itemSource.item});
      return newStateDrop;
    case "REMOVE_STATUS_FROM_TASK_STATUS_RESULT":
      console.log(action)
      let newStateRemoveStatuse = {...state};
      newStateRemoveStatuse.allData.splice(action.payload.indexStatus, 1);
      return  newStateRemoveStatuse;
    default:
      return state;
  }
}

export default taskStatuses;