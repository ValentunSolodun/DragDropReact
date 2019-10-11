let initialeState = {locationTasks: {}, locationSingleTask: {}}

const locationPath = (state = initialeState, action) => {
  switch (action.type) {
    case "CHANGED_PATH_SINGLE_TASK":
      return {
        ...state,
        locationTasks: {
          id_1: action.payload.id_1
        },
        locationSingleTask: action.payload
      }
    case "CHANGED_PATH_TASKS":
      return {
        ...state,
        locationTasks: action.payload
      }
    case "RESET_PATH" :
      return initialeState;
    case "RESET_PATH_SINGLE" :
      return {
        ...state,
        locationSingleTask: {}
      }
    default:
      return state;
  }
}

export default locationPath;
