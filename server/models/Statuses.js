const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");

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

module.exports = Statuses;