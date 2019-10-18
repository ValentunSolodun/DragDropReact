const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");

class TasksStatuses extends Model { }
TasksStatuses.init({}, {
    sequelize,
    modelName: "tasks_statuses"
});

module.exports = TasksStatuses;