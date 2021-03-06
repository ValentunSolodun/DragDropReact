/**
 * @route GET /statuses/{boardId}
 * @group Statuses - API for statuses
 * @param {number} boardId.path.required
 * @returns {object} 200 - An array of user`s projects
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} default - Unexpected error
 * @security JWT
 */

/**
 * @typedef PostStatusModel
 * @property {enum} type - which CRUD operation - eg: ADD, REMOVE, UPDATE
 * @property {string} name
 * @property {string} color
 * @property {number} self_id
 */

/**
 * UPDATE/DELETE/CREATE projects
 * @route POST /statuses/{boardId}
 * @group Statuses
 * @param {PostStatusModel.model} data.body.required
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

const express = require("express");
const statuses = express.Router();
const db = require('../databases/db');
const { Statuses } = require("../models/rootModels");



statuses.get('/:id', async (req, res) => {
    let user = req.user;

    try {

        let getStatuses = await Statuses.findAll({
            attributes: ["id", "name", "color", "boardId"],
            where: {
                boardId: req.params['id']
            }
        })

        // let getStatuses = await db.query(`select s.id, s.name, s.color, s.id_board from statuses as s where s.id_board = ${req.params['id']}`)
        res.send(getStatuses);
    } catch (err) {
        res.sendStatus(500)
    }

});


statuses.post('/:id', async (req, res) => {
    let user = req.user;

    const addItem = async () => {
        let {
            name,
            color,
        } = req.body;

        try {
            let insertStatus = await Statuses.create({
                name,
                boardId: req.params['id'],
                color
            });
            // let insertStatus = await db.query(`insert into statuses (name, id_board, color) values ('${name}', ${req.params['id']}, '${color}')`);
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
            let removeStatus = await Statuses.destroy({
                where: {
                    id: self_id,
                    boardId: req.params['id']
                }
            });
            // let removeStatus = await db.query(`delete from statuses where id_board = ${req.params['id']} and id = ${self_id}`);
            res.sendStatus(200);
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

            let updateStatus = await Statuses.update({
                name: values.name,
                color: values.color
            }, {
                where: {
                    boardId: req.params['id'],
                    id: self_id
                }
            })

            //     let updateStatus = db.query(`update statuses set name = '${values.name}', color = '${values.color}' WHERE id_board = ${req.params['id']} 
            // AND id = ${self_id}`);
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

module.exports = statuses;
