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
    case "RESULT_GET_TASKS_STATUSES":
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
    case "DROP" :
      let newStateDrop = {...state};
      newStateDrop.allData[action.itemSource.indexStatus].tasksGroup.splice(action.itemSource.indexTask, 1);

      newStateDrop.allData[action.itemTarget.indexStatus].tasksGroup.push({...action.itemSource.item});

      console.log(action);
      return newStateDrop;
    case "RESET_TASK_STATUSES" :
      return {...initialeState}
    default:
      return state;
  }
}

export default taskStatuses;