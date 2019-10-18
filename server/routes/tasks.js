const express = require("express");
const tasks = express.Router();
const db = require("../databases/db");
const singleTask = require("./routeSingleTask/singleTask")
const { Tasks, TasksStatuses, Statuses } = require("../models/rootModels");

tasks.use(singleTask);

tasks.get('/:id', async (req, res) => {

    let user = req.user;

    try {
        let getTasks = await Tasks.findAll({
            attributes: ["id", "name", "description", "date", "boardId"],
            where: {
                boardId: req.params["id"]
            }
        });

        await setStatusesInTask(getTasks);
        res.send(getTasks);
    } catch (err) {
        console.log(err);
        res.sendStatus(403)
    }

    async function setStatusesInTask(arr) {
        for (let item of arr) {
            let setStatusesInTask = await Statuses.findAll({
                attributes: ["id", "name", "boardId", "color"],
                where: {
                    boardId: req.params["id"]
                },
                include: [{
                    model: TasksStatuses,
                    where: {
                        taskId: item.id
                    }
                }]
            })
            //     let responseStatuses = await db.query(`select s.id, s.name, s.color, s.id_board from dragdrop.statuses as s inner 
            //   join dragdrop.tasks_statuses as ts on ts.id_status = s.id WHERE s.id_board = ${req.params["id"]} AND ts.id_task = ${item.id}`)
            //         .catch(e => res.sendStatus(403))
            item.dataValues.statusesGroup = setStatusesInTask;
        }
    }
});

tasks.post('/:id', (req, res) => {
    let user = req.user;

    const addItem = async () => {

        let {
            name,
            date,
            status
        } = req.body;

        try {

            let insertTask = await Tasks.create({
                name: name,
                description: name,
                date: date,
                boardId: req.params["id"]
            });

            let insertTaskStatuses = await TasksStatuses.create({
                taskId: insertTask.id,
                statusId: status.id
            });

            // let insertTask = await db.query(`insert into tasks (name, description, date, id_board) values ('${name}', '${name}', '${date}', ${req.params["id"]})`);
            // let insertConnect = await db.query(`insert into tasks_statuses (id_task, id_status) values (${insertTask.insertId}, ${status.id})`);

            res.send(insertTask);
        } catch (err) {
            res.sendStatus(500);
        }

    }

    const removeItem = async () => {
        let {
            self_id
        } = req.body;

        try {

            let deleteTask = await Tasks.destroy({
                where: {
                    id: self_id,
                    boardId: req.params["id"]
                }
            });

            // let deleteTask = await db.query(`delete from tasks where id = ${self_id} AND id_board=${req.params["id"]}`);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

    }

    const updateItem = async () => {
        let {
            self_id,
            boardId,
            values,
        } = req.body;

        function unique(arr) {
            let result = [];

            for (let key of arr) {
                if (!result.some(item => item.name === key.name)) {
                    result.push(key);
                }
            }

            return result;
        }

        try {
            await updateConnectedTable(unique(values.statusesGroup));

            let updateTask = await Tasks.update({
                name: values.name,
                description: values.description || values.name,
                date: new Date(values.date).toISOString().slice(0, 19).replace('T', ' '),
            }, {
                where: {
                    boardId,
                    id: self_id
                }
            });

            //     let response = await db.query(`update tasks set name = '${values.name}', description = '${values.description || values.name}', 
            // date = '${new Date(values.date).toISOString().slice(0, 19).replace('T', ' ')}' where id_board = ${id_board} AND id = ${self_id}`)
            res.send(updateTask);

        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }

        async function updateConnectedTable(arr) {

            await TasksStatuses.destroy({
                where: {
                    taskId: self_id
                }
            });

            // let response = await db.query(`delete from tasks_statuses where id_task = ${self_id}`);
            for (key of arr) {
                await TasksStatuses.create({
                    taskId: self_id,
                    statusId: key.id
                });
                // await db.query(`insert into tasks_statuses (id_task, id_status) values (${self_id}, ${key.id})`)
            }
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

module.exports = tasks;