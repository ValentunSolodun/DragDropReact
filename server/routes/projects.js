/**
 * @route GET /
 * @group Projects - API for projects
 * @returns {object} 200 - An array of user`s projects
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} default - Unexpected error
 * @security JWT
 */

/**
 * @typedef PostProjectModel
 * @property {enum} type - which CRUD operation - eg: ADD, REMOVE, UPDATE
 * @property {string} name
 * @property {string} description
 * @property {number} self_id
 */

/**
 * UPDATE/DELETE/CREATE projects
 * @route POST /
 * @group Projects
 * @param {PostProjectModel.model} data.body.required
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

const express = require("express");
const Projects = express.Router();
const db = require("../databases/db");
// const BoardsUsers = require("../models/BoardsUsers.model");
const {Boards, BoardsUsers} = require("../models/rootModels");

Projects.get('/', (req, res) => {
  let user = req.user;

  Boards.findAll({
    attributes: ["id", "name", "description"],
    include: [{
      attributes: [],
      model: BoardsUsers,
      where: {userId: user.id}
    }]
  })
    .then(rows => res.send({rows, user}))
    .catch(e => console.log(e))

  // db.query(`select b.id, b.name, b.description from boards as b inner join boards_users as bs on bs.id_board = b.id where bs.id_user = ${user.id} `)
  //     .then(rows => res.send({ rows, user }))
  //     .catch(e => res.sendStatus(403))
});

Projects.post('/', async (req, res) => {

  let user = req.user;

  const addItem = async () => {
    let {
      name,
      description,
    } = req.body;

    try {

      let insertInBoards = await Boards.create({
        name,
        description
      })

      console.log(insertInBoards);

      BoardsUsers.create({
        boardId: insertInBoards.id,
        userId: user.id
      })

      res.send(insertInBoards);

    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }


    // try {
    //     let insertInBoards = await db.query(`insert into boards (name, description) values ('${name}', '${description}')`)
    //     let insertInBoardsUser = await db.query(`insert into boards_users (id_board, id_user) values (${insertInBoards.insertId}, ${user.id})`)

    //     res.send(insertInBoards);

    // } catch (err) {
    //     console.log(err);
    //     res.sendStatus(500);

    // }

  }

  const removeItem = async () => {
    let {
      self_id
    } = req.body;

    try {

      let deleteBoard = await Boards.destroy({
        where: {
          id: self_id
        }
      })

      // let deleteBoard = await db.query(`delete from boards where id = ${self_id}`)

      res.sendStatus(200);

    } catch (err) {
      console.log(err)
      res.sendStatus(500);

    }


  }

  const updateItem = async () => {
    let {
      self_id,
      values
    } = req.body;

    try {

      let updateBoard = await Boards.update({
        name: values.name,
        description: values.description
      }, {
        where: {
          id: self_id
        }
      })
      // let response = await db.query(`update boards set name = '${values.name}', description = '${values.description}' WHERE id = ${self_id}`);

      res.send(updateBoard);
    } catch (err) {
      res.sendStatus(500)
    }

  }

  console.log(req.body);

  switch (req.body.type) {
    case 'ADD':
      addItem(req.body.kind);
      break;
    case 'REMOVE':
      removeItem(req.body.kind);
      break;
    case 'UPDATE':
      updateItem(req.body.kind);
      break;
    default:
      console.log('default');
  }
});

module.exports = Projects;
