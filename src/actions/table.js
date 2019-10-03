export const getBoards = () => ({
   type: "SENDGETBOARDS"
});

export const getTasks = (id) => ({
    type: "SENDGETTASKS",
    id: id
});

export const getStatuses = () => ({
    type: "SENDGETSTATUSES"
});

export const addItem = (e, type, url_id) => {
   e.preventDefault();
   // console.dir(e.target)
    return {
       type: "SENDADDITEM",
       objField: {
          type: "ADD",
          kind: type,
          id: url_id,
          name: e.target.name_item.value,
          description: e.target.desc_item ? e.target.desc_item.value : "",
          status: e.target.status_item ? e.target.status_item.value : "",
          date: new Date().toISOString().slice(0, 19).replace('T', ' ')
       }
    }
};

export const removeItem = (item, index, kind) => {
    return {
        type: "SENDREMOVEITEM",
        objField: {
            type: "REMOVE",
            kind: kind,
            id_board: item.id_board || item.id,
            self_id: item.id,
            index: index
        }
    }
}

export const updateItem = (item, index, kind) => {
    if(kind === "project") {
        return {
            type: "UPDATINGITEMPROJECTS",
            objField: {
                index: index,
            }
        }
    } else {
        return {
            type: "UPDATINGITEMTASKS",
            objField: {
                index: index,
            }
        }
    }

}
export const updateItemSend = (item, index, values) => {
    return {
        type: "SENDUPDATINGITEM",
        objField: {
            type: "UPDATE",
            item: item.id,
            index: index,
            values: values
        }
    }
}

export const cancelUpdate = index => {
    return {
        type: "CANCELUPDATINGITEM",
        objField: {
            index: index
        }
    }
}