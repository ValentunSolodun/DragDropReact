const express = require("express");
const singleTask = express.Router();
const db = require("../../databases/db");

singleTask.get('/:id_board/tasks/:id_task', async (req, res) => {
    let user = req.user;
    
    console.log(req.params);

    let values = {
      id_board: +req.params["id_board"],
      id_task: +req.params["id_task"]
    }
  
    try {
  
      let response = await db.query(`select t.id, t.id_board, t.name, t.description, t.date from tasks as t where id_board = ${values.id_board} and id = ${values.id_task}`)
      await setStatusesInTask(response);
  
      res.send(response);
  
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  
    async function setStatusesInTask(arr) {
      for (let item of arr) {
        let responseStatuses = await db.query(`select s.id, s.name, s.color from dragdrop.statuses as s inner 
              join dragdrop.tasks_statuses as ts on ts.id_status = s.id WHERE s.id_board = ${values.id_board} AND ts.id_task = ${values.id_task}`)
  
        item.statusesGroup = responseStatuses;
      }
    }
  
  
  });

  module.exports = singleTask;