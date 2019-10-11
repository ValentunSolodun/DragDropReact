export const getBoards = () => ({
  type: "SENDGETBOARDS"
});

export const getTasks = (id) => ({
  type: "SENDGETTASKS",
  id: id
});

export const getStatuses = (id) => ({
  type: "SENDGETSTATUSES",
  id: id
});

export const addItem = (e, type, project_id, statuses) => {
  e.preventDefault();
  // console.dir(e.target)
  return {
    type: "SENDADDITEM",
    objField: {
      type: "ADD",
      kind: type,
      id: project_id,
      name: e.target.name_item.value,
      description: e.target.desc_item ? e.target.desc_item.value : "",
      status: statuses[e.target.status_item ? e.target.status_item.value : ""],
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      color: e.target.color_item ? e.target.color_item.value : ""
    }
  }
};

export const removeItem = (item, index, kind) => {
  console.log(item)
  console.log(index)
  console.log(kind)
  return {
    type: "SENDREMOVEITEM",
    objField: {
      type: "REMOVE",
      kind: kind,
      id: item.id_board || item.id,
      self_id: item.id,
      index: index
    }
  }
}

export const updateItem = (item, index, kind) => {
  if (kind === "project") {
    return {
      type: "UPDATINGITEMPROJECTS",
      objField: {
        index: index,
      }
    }
  } else if (kind === "tasks") {
    return {
      type: "UPDATINGITEMTASKS",
      objField: {
        index: index,
      }
    }
  } else if (kind === "statuses") {
    return {
      type: "UPDATINGITEMSTATUSES",
      objField: {
        index: index,
      }
    }
  }

}
export const updateItemSend = (item, index, values, kind) => {
  return {
    type: "SENDUPDATINGITEM",
    objField: {
      type: "UPDATE",
      kind: kind,
      id_board: item.id_board || item.id,
      self_id: item.id,
      index: index,
      values: values
    }
  }
}

export const cancelUpdate = (index, kind) => {
  if (kind === 'project') {
    return {
      type: "CANCELUPDATINGITEMPROJECTS",
      objField: {
        index: index
      }
    }
  } else if (kind === "tasks") {
    return {
      type: "CANCELUPDATINGITEMTASKS",
      objField: {
        index: index
      }
    }
  } else if (kind === "statuses") {
    return {
      type: "CANCELUPDATINGITEMSTATUSES",
      objField: {
        index: index
      }
    }
  }

}