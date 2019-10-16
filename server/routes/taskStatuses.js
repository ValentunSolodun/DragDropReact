const express = require("express");
const TaskStatuses = express.Router();
const db = require('../databases/db');

TaskStatuses.get('/:id', async (req, res) => {
    let user = req.user;

    try {
        let getStatuses = await db.query(`select s.id, s.name, s.id_board, s.color from statuses as s inner join draggable_statuses as 
      ds on ds.id_status = s.id where ds.id_board = ${req.params['id']}`);
        await setTasks(getStatuses);

        res.send(getStatuses);
    } catch (err) {
        res.sendStatus(500);
    }

    async function setTasks(arr) {
        for (item of arr) {
            let getTasks = await db.query(`select t.id, t.name from tasks as t inner join tasks_statuses as ts 
        on ts.id_task = t.id where ts.id_status = ${item.id} and t.id_board = ${req.params['id']}`)
            if (!getTasks) return;
            item.tasksGroup = getTasks;
        }
    }
});


TaskStatuses.post('/:id', async (req, res) => {
    let user = req.user;

    async function addStatus() {

        let {
            status_id
        } = req.body;

        try {
            let getStatuses = await db.query(`select s.id, s.name, s.id_board, s.color from statuses as s where s.id_board = ${req.params['id']} 
      and s.id = ${status_id}`)
            let setStatuses = await db.query(`insert into draggable_statuses (id_board, id_status) values (${req.params['id']}, ${status_id})`)
            await setTasks(getStatuses);

            res.send(getStatuses);
        } catch (err) {
            console.log(err)
            res.sendStatus(500);
        }

        async function setTasks(arr) {
            for (item of arr) {
                let getTasks = await db.query(`select t.id, t.name from tasks as t inner join tasks_statuses as ts 
        on ts.id_task = t.id where ts.id_status = ${status_id} and t.id_board = ${req.params['id']}`)
                if (!getTasks) return;
                item.tasksGroup = getTasks;
            }
        }

    }

    async function droppedNewTask() {
        let {
            status_id,
            itemSource,
            itemTarget
        } = req.body;

        try {
            let updateTaskStatuses = await db.query(`update tasks_statuses set id_status = ${itemTarget.item.id} where id_task = ${itemSource.item.id} 
        and id_status = ${itemSource.idStatus} limit 1`);
            res.send(updateTaskStatuses);
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async function removeStatus() {
        let {
            idStatus
        } = req.body

        try {
            let removeStatus = await db.query(`delete from draggable_statuses where id_board = ${req.params['id']} and id_status = ${idStatus}`)

            res.send(removeStatus);
        } catch (err) {
            res.sendStatus(500);
        }

    }

    switch (req.body.type) {
        case "DROPPED_NEW_TASK":
            droppedNewTask();
            break;
        case "REMOVE_STATUS":
            removeStatus();
            break;
        case "ADD_STATUS":
            addStatus();
        default:
            console.log('default');
    }
});

module.exports = TaskStatuses;