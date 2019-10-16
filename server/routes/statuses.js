const express = require("express");
const Statuses = express.Router();
const db = require('../databases/db');



Statuses.get('/:id', async (req, res) => {
    let user = req.user;

    try {
        let getStatuses = await db.query(`select s.id, s.name, s.color, s.id_board from statuses as s where s.id_board = ${req.params['id']}`)
        res.send(getStatuses);
    } catch (err) {
        res.sendStatus(500)
    }

});


Statuses.post('/:id', async (req, res) => {
    let user = req.user;

    const addItem = async () => {
        let {
            name,
            color,
        } = req.body;

        try {
            let insertStatus = await db.query(`insert into statuses (name, id_board, color) values ('${name}', ${req.params['id']}, '${color}')`);
            res.send(insertStatus)
        } catch (err) {
            res.sendStatus(500)
        }
    }

    const removeItem = async () => {
        let {
            self_id
        } = req.body;

        try {
            let removeStatus = await db.query(`delete from statuses where id_board = ${req.params['id']} and id = ${self_id}`);
            res.send(removeStatus);
        } catch (err) {
            res.sendStatus(500)
        }

    }

    const updateItem = async () => {
        let {
            self_id,
            values
        } = req.body;

        try {
            let updateStatus = db.query(`update statuses set name = '${values.name}', color = '${values.color}' WHERE id_board = ${req.params['id']} 
        AND id = ${self_id}`);
            res.send(updateStatus);
        } catch (err) {
            res.sendStatus(500);
        }
    }

    switch (req.body.type) {
        case 'ADD':
            addItem();
            break;
        case 'REMOVE':
            removeItem();
            break;
        case 'UPDATE':
            updateItem();
            break;
        default:
            console.log('default');
    }
});

module.exports = Statuses;