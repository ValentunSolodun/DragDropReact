export const getBoards = () => ({
   type: "SENDGETTABLES"
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