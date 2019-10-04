export const getSingleTask = (id_1, id_2) => ({
    type: "SENDGETSINGLETASK",
    url_id: {
        id_1,
        id_2
    }
});