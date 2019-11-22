const express = require("express");
const users = express.Router();
// const db = require('../databases/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require("../models/User");
const mongoose = require("mongoose");
const _ = require("lodash");
// const { Users } = require('../models/rootModels');

users.post('/register', (req, res) => {
  console.log(req.body);
  const userObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    findOneUser(userObj.email).then(
      result => {
        console.log(result)
        if (!_.isEmpty(result)) res.send('User is already exist');
        // if (result.length) res.send('User is already exist');
        else {
          let newUser = new User({
            name: userObj.name,
            email: userObj.email,
            password: hash
          });

          newUser.save((err) => {
            mongoose.disconnect();
            if (err) {
              res.sendStatus(500);
              return console.log(err);
            }
            res.send("Registered")
            console.log("Сохранен объект", newUser);
          })
          // Users.create({
          //   name: userObj.name,
          //   email: userObj.email,
          //   password: hash
          // })
          //   .then(() => res.send("Registered"))
          //   .catch(err => res.sendStatus(500))
          // db.query(`INSERT INTO users(name, email, password) VALUES ('${userObj.name}', '${userObj.email}', '${hash}' )`).then(
          //   result => {
          //     res.send('Registered')
          //   }
          // )
        }
      }
    );
  });

  async function findOneUser(email) {
    return User.findOne({email: email})
    // return Users.findAll({
    //   where: {
    //     email: email
    //   }
    // })
  }


});

users.post('/login', (req, res) => {

  const userObj = {
    email: req.body.email,
    password: req.body.password
  }

  Users.findAll({
    where: {
      email: userObj.email
    }
  })
    .then(
      rows => {

        function generateToken(id, name, email) {
          let u = {
            id: id,
            name: name,
            email: email,
          };
          return token = jwt.sign(u, config.secret, {
            expiresIn: 60 * 60 * 24
          });
        }

        if (bcrypt.compareSync(userObj.password, rows[0].password)) {
          let token = generateToken(rows[0].id, rows[0].name, rows[0].email);
          res.send(token);
        } else {
          res.sendStatus(403);
        }

      },
      err => console.log(err)
    )
    .catch(err => res.sendStatus(403));

});

module.exports = users;