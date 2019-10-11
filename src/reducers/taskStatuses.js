let initialeState = {showSelect: false, allData: []};

const taskStatuses = (state = initialeState, action) => {
  switch (action.type) {
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
    case "RESET_TASK_STATUSES" :
      return {...initialeState}
    default:
      return state;
  }
}

export default taskStatuses;