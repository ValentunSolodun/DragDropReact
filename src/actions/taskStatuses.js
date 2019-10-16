export const selectedStatus = (whatStatus, project_id) => {
  return {
    type: "SEND_SELECT_STATUS",
    objField: {
      type: "ADD_STATUS",
      status_id: whatStatus.id,
      project_id
    }
  }
};

export const removeStatusFromTaskStatuses = (indexStatus, idStatus, project_id) => {
  return {
    type: "SEND_REMOVE_STATUS_FROM_TASK_STATUS",
    objField: {
      type:"REMOVE_STATUS",
      project_id,
      indexStatus,
      idStatus,
    }
  }
}

export const toggleSelect = (isShow) => {
  return {
    type: "TOGGLE_SELECT",
    payload: {
      show: isShow
    }
  }
};
