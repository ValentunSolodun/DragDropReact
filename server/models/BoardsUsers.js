const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../databases/db");

class BoardsUsers extends Model { }
BoardsUsers.init({}, {
    sequelize,
    modelName: "boards_users"
});

module.exports = BoardsUsers;