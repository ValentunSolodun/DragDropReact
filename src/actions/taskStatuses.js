export const selectedStatus = (whatStatus, project_id) => {
  return {
    type: "SEND_SELECT_STATUS",
    objField: {
      status_id: whatStatus.id,
      project_id
    }
  }
};

export const toggleSelect = (isShow) => {
  return {
    type: "TOGGLE_SELECT",
    payload: {
      show: isShow
    }
  }
};
