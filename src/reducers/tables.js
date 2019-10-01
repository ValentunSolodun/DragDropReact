const initialeState = { boards: [], tasks: [] };

const tables = (state = initialeState, action) => {
    switch (action.type) {
        case "SENDGETTABLES":
            return state;
        case "RESULTGETTABLES":
            return {
                boards: [
                    ...state.boards,
                    ...action.payload
                ]
            }
        case "RESULTADDITEM":
            return {
                boards: [
                    ...state.boards,
                    { board_name: action.payload.name, board_description: action.payload.description, id: action.payload.id}
                ]
            }
        default:
            return state;
    }

}

export default tables;