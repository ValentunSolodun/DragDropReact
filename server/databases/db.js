const Sequelize = require("sequelize");
// const Users = require("../models/User.model");

const sequelize = new Sequelize('drag_drop_sequelize', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync();

// const Users = db.define('users', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });


// const mysql = require('mysql');

// const configDB = {
//   host: "localhost",
//   user: "root",
//   password: "12345",
//   database: 'dragdrop'
// };

// class DB {
//   constructor(config) {
//     this.connection = mysql.createConnection(config);
//     this.connection.connect(err => {
//       if (err) throw new Error(err);
//       console.log("Connected to db!");
//     });
//   }

//   query(sql, args) {
//     return new Promise((resolve, reject) => {
//       this.connection.query(sql, args, (err, rows) => {
//         if (err) return reject(err);
//         resolve(rows)
//       });
//     });
//   }
// }

// const db = new DB(configDB);

module.exports = sequelize;