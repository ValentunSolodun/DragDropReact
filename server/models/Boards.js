const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");


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

module.exports = Boards;