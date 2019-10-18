const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");

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

module.exports = Tasks;