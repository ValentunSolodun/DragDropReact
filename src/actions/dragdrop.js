export const dropOnTarget = (itemSource, itemTarget, project_id) => ({
  type: "DROP_SEND",
  objField: {
    type: "DROPPED_NEW_TASK",
    project_id,
    itemSource: {
      ...itemSource
    },
    itemTarget: {
      ...itemTarget
    }
  }
});

export const getDraggableStatuses = (project_id) => ({
  type: "SEND_GET_DRAGGABLE_STATUSES",
  objField : {
    type: "GET_DRAGGABLE_STATUSES",
    project_id
  }
});