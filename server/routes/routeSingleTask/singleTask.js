/**
 * @route GET /project/{boardId}/tasks/{taskId}
 * @group SingleTask - API for open single task
 * @param {number} boardId.path.required
 * @param {number} taskId.path.required
 * @returns {object} 200 - An array of user`s projects
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} default - Unexpected error
 * @security JWT
 */

const express = require("express");
const singleTask = express.Router();
const db = require("../../databases/db");
const { Tasks, Statuses, TasksStatuses } = require("../../models/rootModels");

singleTask.get('/:boardId/tasks/:taskId', async (req, res) => {
  let user = req.user;

  console.log(req.params);

  let values = {
    boardId: +req.params["boardId"],
    taskId: +req.params["taskId"]
  }

  try {

    let getTasks = await Tasks.findAll({
      where: {
        boardId: values.boardId,
        id: values.taskId
      }
    })

    // let response = await db.query(`select t.id, t.id_board, t.name, t.description, t.date from tasks as t where id_board = ${values.id_board} and id = ${values.id_task}`)
    await setStatusesInTask(getTasks);

    res.send(getTasks);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  async function setStatusesInTask(arr) {
    for (let item of arr) {
      let setStatusesInTask = await Statuses.findAll({
        attributes: ["id", "name", "boardId", "color"],
        where: {
          boardId: values.boardId
        },
        include: [{
          model: TasksStatuses,
          where: {
            taskId: item.id
          }
        }]
      })
      // await db.query(`select s.id, s.name, s.color from dragdrop.statuses as s inner 
      //       join dragdrop.tasks_statuses as ts on ts.id_status = s.id WHERE s.id_board = ${values.id_board} AND ts.id_task = ${values.id_task}`)

      item.dataValues.statusesGroup = setStatusesInTask;
    }
  }


});

module.exports = singleTask;
