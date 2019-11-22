const express = require("express");
const Projects = express.Router();
const db = require("../databases/db");
const Board = require("../models/Boards");
const mongoose = require("mongoose");
// const { Boards, BoardsUsers } = require("../models/rootModels");

Board.watch((args) => console.log(args));

Projects.get('/', (req, res) => {
    let user = req.user;

    Board.find({usersId: user._id})
      .then(rows => res.send({ rows, user }))
      .catch(e => {
          res.sendStatus(500);
          console.log(e)
      });

    // Board.findAll({
    //     attributes: ["id", "name", "description"],
    //     include: [{
    //         attributes: [],
    //         model: BoardsUsers,
    //         where: { userId: user.id }
    //     }]
    // })
    //     .then(rows => res.send({ rows, user }))
    //     .catch(e => console.log(e))

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
            let insertBoard = new Board({
                name,
                description,
                usersId: [user._id]
            });
            insertBoard.save((err) => {
                if (err) {
                    res.sendStatus(500);
                    return console.log(err);
                }
                res.send(insertBoard)
                // console.log("Сохранен объект", insertBoard);
            });
            // let insertInBoards = await Boards.create({
            //     name,
            //     description
            // })
            //
            // console.log(insertInBoards);
            //
            // BoardsUsers.create({
            //     boardId: insertInBoards.id,
            //     userId: user.id
            // })
            //
            // res.send(insertInBoards);

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

        console.log(req.body);

        try {

            let deleteBoard = await Board.deleteOne({_id: self_id});

            // let deleteBoard = await Boards.destroy({
            //     where: {
            //         id: self_id
            //     }
            // })

            // let deleteBoard = await db.query(`delete from boards where id = ${self_id}`)

            res.sendStatus(200);

        } catch (err) {
            console.log(err);
            res.sendStatus(500);

        }


    }

    const updateItem = async () => {
        let {
            self_id,
            values
        } = req.body;

        try {

            let updateBoard = await Board.findByIdAndUpdate(self_id, {
                name: values.name,
                description: values.description
            });

            // let updateBoard = await Boards.update({
            //     name: values.name,
            //     description: values.description
            // }, {
            //     where: {
            //         id: self_id
            //     }
            // })


            // let response = await db.query(`update boards set name = '${values.name}', description = '${values.description}' WHERE id = ${self_id}`);

            res.send(updateBoard);
        } catch (err) {
            res.sendStatus(500)
        }

    }

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