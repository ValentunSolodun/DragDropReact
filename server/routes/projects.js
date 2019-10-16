const express = require("express");
const Projects = express.Router();
const db = require("../databases/db");

Projects.get('/', (req, res) => {
    let user = req.user;

    db.query(`select b.id, b.name, b.description from boards as b inner join boards_users as bs on bs.id_board = b.id where bs.id_user = ${user.id} `)
        .then(rows => res.send({ rows, user }))
        .catch(e => res.sendStatus(403))
});

Projects.post('/', async (req, res) => {

    let user = req.user;

    const addItem = async () => {
        let {
            name,
            description,
        } = req.body;

        try {
            let insertInBoards = await db.query(`insert into boards (name, description) values ('${name}', '${description}')`)
            let insertInBoardsUser = await db.query(`insert into boards_users (id_board, id_user) values (${insertInBoards.insertId}, ${user.id})`)

            res.send(insertInBoards);

        } catch (err) {
            console.log(err);
            res.sendStatus(500);

        }

    }

    const removeItem = async () => {
        let {
            self_id
        } = req.body;

        try {

            let deleteBoard = await db.query(`delete from boards where id = ${self_id}`)

            res.send(200);

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
            let response = await db.query(`update boards set name = '${values.name}', description = '${values.description}' WHERE id = ${self_id}`);

            res.send(response);
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