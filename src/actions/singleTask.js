export const getSingleTask = (id_1, id_2) => ({
  type: "SENDGETSINGLETASK",
  url_id: {
    id_1,
    id_2
  }
});

export const updateSingleTask = (isChecked) => ({
  type: "UPDATINGITEMSINGLETASK",
  objField: {
    index: 0,
    isChecked: isChecked
  }
});

export const updateSingleTaskSend = (item, index, values) => {
  return {
    type: "SENDUPDATEITEMSINGLETASKS",
    objField: {
      type: "UPDATE",
      kind: 'tasks',
      boardId: item.boardId || item.id,
      self_id: item.id,
      index: index,
      values: values
    }
  }
};