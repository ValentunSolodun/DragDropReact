const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    id: Number,
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userScheme);

module.exports = User;


// const Sequelize = require("sequelize");
// const Model = Sequelize.Model;
// const sequelize = require("../databases/db");
//
// class Users extends Model { }
// Users.init({
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     modelName: "users"
// });
//
// module.exports = Users;

