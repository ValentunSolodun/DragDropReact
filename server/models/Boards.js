const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardScheme = new Schema({
    id: Number,
    name: String,
    description: String,
    usersId: Array
});

const Board = mongoose.model("Boards", boardScheme);


module.exports = Board;

// const Sequelize = require("sequelize");
// const Model = Sequelize.Model;
// const sequelize = require("../databases/db");
//
//
// class Boards extends Model { }
// Boards.init({
//     name: {
//         type: Sequelize.STRING
//     },
//     description: {
//         type: Sequelize.STRING
//     }
// }, {
//     sequelize,
//     modelName: "boards"
// });
//
// module.exports = Boards;