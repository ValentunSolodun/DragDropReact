const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");

class DraggableStatuses extends Model { }
DraggableStatuses.init({}, {
    sequelize,
    modelName: "draggable_statuses"
});

module.exports = DraggableStatuses;