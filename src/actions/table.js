export const getBoards = () => ({
   type: "SENDGETBOARDS"
});

export const getTasks = (id) => ({
    type: "SENDGETTASKS",
    id: id
});

export const addItem = e => {
   e.preventDefault();
    return {
       type: "SENDADDITEM",
       objField: {
          type: "ADD",
          name: e.target.name_item.value,
          description: e.target.desc_item.value
       }
    }
};

export const removeItem = (item, index) => {
    return {
        type: "SENDREMOVEITEM",
        objField: {
            type: "REMOVE",
            id: item.id,
            index: index
        }
    }
}

export const updateItem = (item, index) => {
    return {
        type: "UPDATINGITEM",
        objField: {
            index: index
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