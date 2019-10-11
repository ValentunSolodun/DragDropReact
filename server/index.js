const express = require('express');
// const mysql = require('mysql');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const Users = require("./routes/Users");
const db = require('./databases/db');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

var cors = require('cors');
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


process.env.SECRET_KEY = 'secret';


app.use('/users', Users);

app.use('/', (req, res, next) => {

  let token = req.headers.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      req.user = data;
      next();
    }

  });
});

app.post('/task_statuses/:id', async (req, res) => {
  let user = req.user;

  let {
    status_id
  } = req.body;
  console.log(req.body);

  try {
    let getStatuses = await db.query(`select s.id, s.name, s.id_board, s.color from statuses as s where s.id_board = ${req.params['id']} 
    and s.id = ${status_id}`)
    await setTasks(getStatuses);


    res.send(getStatuses);
  } catch (err) {
    console.log(err);
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

  // async function getTasksForStatuses(arr) {
  //   for (item of arr) {
  //     for (item_ of item.statusesGroup) {
  //       let response = await db.query(`select t.id, t.name from tasks as t inner join tasks_statuses as ts 
  // 			on ts.id_task = t.id where ts.id_status = ${item_.id} and t.id_board = ${item.id}`)
  //         .catch(e => res.sendStatus(403));
  //       item_.taskGroup = response;
  //     }
  //   }
  // }

});

app.get('/project/:id_board/tasks/:id_task', async (req, res) => {
  let user = req.user;

  let values = {
    id_board: +req.params["id_board"],
    id_task: +req.params["id_task"]
  }

  try {

    let response = await db.query(`select t.id, t.name, t.description, t.date from tasks as t where id_board = ${values.id_board} and id = ${values.id_task}`)
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


app.get('/', (req, res) => {
  let user = req.user;

  db.query(`select b.id, b.name, b.description from boards as b inner join boards_users as bs on bs.id_board = b.id where bs.id_user = ${user.id} `)
    .then(rows => res.send({ rows, user }))
    .catch(e => res.sendStatus(403))

  // db.query(`SELECT * FROM boards WHERE id_user = '${user.id}' `)
  //   .then(rows => res.send({rows, user}))
  //   .catch(e => res.sendStatus(403))
});

app.get('/project/:id', async (req, res) => {
  let user = req.user;

  const setStatusesInTask = async (arr) => {
    for (let item of arr) {
      let responseStatuses = await db.query(`select s.id, s.name, s.color from dragdrop.statuses as s inner 
			join dragdrop.tasks_statuses as ts on ts.id_status = s.id WHERE s.id_board = ${req.params["id"]} AND ts.id_task = ${item.id}`)
        .catch(e => res.sendStatus(403))
      item.statusesGroup = responseStatuses;
    }
    ;
  }

  let response = await db.query(`select t.id, t.name, t.date, t.id_board FROM tasks as t where t.id_board = ${req.params["id"]}`)
    .catch(e => res.sendStatus(403))

  await setStatusesInTask(response);

  res.send(response);

  // db.query(`select tasks.id, tasks.name, tasks.date, tasks.status, tasks.id_user,
  // 	tasks.id_board, statuses.color from tasks inner join statuses on tasks.status = statuses.name
  // 	WHERE tasks.id_user = '${user.id}' AND tasks.id_board = ${req.params["id"]}`)
  // 	.then(rows => res.send(rows))
  // 	.catch(e => res.sendStatus(403))

  //--------------------

  // db.query(`select tasks.id, tasks.name, tasks.date, tasks.id_user, tasks.id_board, statuses.name as status_name, statuses.color, statuses.id_user as
  // status_user_id from ((tasks inner join tasks_statuses on tasks.id = tasks_statuses.id_task)
  // inner join statuses on tasks_statuses.id_statuses = statuses.id) WHERE tasks.id_user = ${user.id} AND statuses.id_user = ${user.id}`)
  // 	.then(rows => res.send(rows))
  // 	.catch(e => console.log(e))

});


app.post('/project/:id', (req, res) => {
  let user = req.user;

  const addItem = async () => {

    let {
      name,
      date,
      status
    } = req.body;

    try {
      let insertTask = await db.query(`insert into tasks (name, date, id_board) values ('${name}', '${date}', ${req.params["id"]})`);
      let insertConnect = await db.query(`insert into tasks_statuses (id_task, id_status) values (${insertTask.insertId}, ${status.id})`);

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
      let deleteTask = await db.query(`delete from tasks where id = ${self_id} AND id_board=${req.params["id"]}`);
      res.send(deleteTask);
    } catch (err) {
      res.sendStatus(400);
    }

  }

  const updateItem = async () => {
    let {
      self_id,
      id_board,
      values,
    } = req.body;

    try {
      await updateConnectedTable(values.statusGroup);

      let response = await db.query(`UPDATE tasks SET name = '${values.name}', description = '${values.description}', 
      date = '${new Date(values.date).toISOString().slice(0, 19).replace('T', ' ')}' WHERE id_board = ${id_board} AND id = ${self_id}`)
      res.send(response);

    } catch (err) {
      console.log(err);
      res.sendStatus(500)
    }

    async function updateConnectedTable(arr) {
      let response = await db.query(`delete from tasks_statuses where id_task = ${self_id}`);
      for (key of arr) {
        await db.query(`insert into tasks_statuses (id_task, id_status) values (${self_id}, ${key.id})`)
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


app.get('/statuses/:id', async (req, res) => {
  let user = req.user;

  try {
    let getStatuses = await db.query(`select s.id, s.name, s.color, s.id_board from statuses as s where s.id_board = ${req.params['id']}`)
    res.send(getStatuses);
  } catch (err) {
    res.sendStatus(500)
  }

});


app.post('/statuses/:id', async (req, res) => {
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

app.post('/', async (req, res) => {

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
    // console.log(req.body)
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

app.listen(port, () => console.log('server created on port - ' + port));