const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");
// const Users = require("../models/User");

class Users extends Model { }
Users.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "users"
});

class BoardsUsers extends Model { }
BoardsUsers.init({}, {
    sequelize,
    modelName: "boards_users"
});

class Boards extends Model { }
Boards.init({
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: "boards"
});

class Statuses extends Model { }
Statuses.init({
    name: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: "statuses"
});

class Tasks extends Model { }
Tasks.init({
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    }
}, {
    sequelize,
    modelName: "tasks"
});

class TasksStatuses extends Model { }
TasksStatuses.init({}, {
    sequelize,
    modelName: "tasks_statuses"
});

Tasks.hasMany(TasksStatuses, { onDelete: "CASCADE" });
Statuses.hasMany(TasksStatuses, {onDelete: "CASCADE"});

Boards.hasMany(Statuses, { onDelete: "CASCADE" });
Boards.hasMany(Tasks, { onDelete: "CASCADE" });

Boards.hasMany(BoardsUsers, { onDelete: "CASCADE" });
Users.hasMany(BoardsUsers, { onDelete: "CASCADE" });

module.exports = {
    Users,
    Boards,
    BoardsUsers,
    Tasks,
    Statuses,
    TasksStatuses
};
