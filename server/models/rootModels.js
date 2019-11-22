// const Users = require("./User");
// const Boards = require("./Boards");
// const BoardsUsers = require("./BoardsUsers");
// const Statuses = require("./Statuses");
// const Tasks = require("./Tasks");
// const TasksStatuses = require("./TasksStatuses");
// const DraggableStatuses = require("./DraggableStatuses");
//
// Users.hasMany(BoardsUsers, { onDelete: "CASCADE" });
// Boards.hasMany(DraggableStatuses, { onDelete: "CASCADE" });
// Boards.hasMany(Statuses, { onDelete: "CASCADE" });
// Boards.hasMany(Tasks, { onDelete: "CASCADE" });
// Boards.hasMany(BoardsUsers, { onDelete: "CASCADE" });
// Tasks.hasMany(TasksStatuses, { onDelete: "CASCADE" });
// Statuses.hasMany(DraggableStatuses, {onDelete: "CASCADE"});
// Statuses.hasMany(TasksStatuses, {onDelete: "CASCADE"});
//
// module.exports = {
//     Users,
//     Boards,
//     BoardsUsers,
//     Tasks,
//     Statuses,
//     TasksStatuses,
//     DraggableStatuses
// };
