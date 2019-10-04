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

app.get('/project/:id_board/tasks/:id_task', (req, res) => {
	let user = req.user;

	let values = {
		id_board: +req.params["id_board"],
		id_task: +req.params["id_task"]
	}

	console.log(values)

	db.query(`SELECT * FROM tasks WHERE id_user = ${user.id} AND id_board = ${values.id_board} AND id = ${values.id_task} `)
		.then(rows => res.send(rows))
		.catch(e => res.sendStatus(403))
});


app.get('/', (req, res) => {
	let user = req.user;
	db.query(`SELECT * FROM boards WHERE id_user = '${user.id}' `)
		.then(rows => res.send({ rows, user }))
		.catch(e => res.sendStatus(403))
});

app.get('/project/:id', (req, res) => {
	let user = req.user;
	db.query(`SELECT * FROM tasks WHERE id_user = '${user.id}' AND id_board = ${req.params["id"]}`)
		.then(rows => res.send(rows))
		.catch(e => res.sendStatus(403));
});





app.post('/project/:id', (req, res) => {
	let user = req.user;

	const addItem = () => {

		let {
			name,
			date,
			status
		} = req.body;

		db.query(`INSERT INTO tasks (name, date, status, id_user, id_board) VALUES ('${name}', '${date}', '${status}', ${user.id}, ${req.params["id"]})`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403));
	}

	const removeItem = () => {
		let {
			self_id
		} = req.body;

		console.log(req.body);

		db.query(`DELETE FROM tasks WHERE id_user = ${user.id} AND id = ${self_id} AND id_board=${req.params["id"]}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403))
	}

	const updateItem = () => {
		let {
			self_id,
			id_board,
			values,
		} = req.body;

		console.log(req.body);

		db.query(`UPDATE tasks SET name = '${values.name}', status = '${values.status}', 
		date = '${new Date(values.date).toISOString().slice(0, 19).replace('T', ' ')}' WHERE id_board = ${id_board} AND id_user = ${user.id} AND id = ${self_id}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403));
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



app.get('/statuses', (req, res) => {
	let user = req.user;
	db.query(`SELECT * FROM statuses WHERE id_user = '${user.id}'`)
		.then(rows => res.send(rows))
		.catch(e => res.sendStatus(403));
});
app.post('/statuses', (req, res) => {
	let user = req.user;

	const addItem = () => {
		let {
			name,
			color,
		} = req.body;

		db.query(`INSERT INTO statuses (name, id_user, color) VALUES ('${name}', ${user.id}, '${color}')`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403))
	}

	const removeItem = () => {
		let {
			self_id
		} = req.body;

		db.query(`DELETE FROM statuses WHERE id_user = ${user.id} AND id = ${self_id}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403))
	}

	const updateItem = () => {
		console.log(req.body)
		let {
			self_id,
			values
		} = req.body;

		db.query(`UPDATE statuses SET name = '${values.name}', color = '${values.color}' WHERE id_user = ${user.id} AND id = ${self_id}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403));
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

app.post('/', (req, res) => {

	let user = req.user;
	const addItem = () => {
		let {
			name,
			description,
		} = req.body;

		db.query(`INSERT INTO boards (name, description, id_user) VALUES ('${name}', '${description}', ${user.id})`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403))
	}

	const removeItem = () => {
		let {
			self_id
		} = req.body;

		db.query(`DELETE FROM boards WHERE id_user = ${user.id} AND id = ${self_id}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403))
	}

	const updateItem = () => {
		console.log(req.body)
		let {
			self_id,
			values
		} = req.body;

		db.query(`UPDATE boards SET name = '${values.name}', description = '${values.description}' WHERE id_user = ${user.id} AND id = ${self_id}`)
			.then(rows => res.send(rows))
			.catch(e => res.sendStatus(403));
	}

	// // console.log(req.headers.token);
	// function resultQuery(err, result) {
	// 	if(err) throw new Error(err);
	// 	res.sendStatus(200);
	// 	console.log('UPDATED');
	// }

	// function addFields(type, columnLength, rowLength) {
	// 	if(type === 'ADDROW') {
	// 		for(let i = 0; i < columnLength; i++) {
	// 			db.query(`INSERT into texts (id_row, id_column, text, id_user) VALUES (${rowLength}, ${i}, ' ', ${idUser})`).then(done => resultQuery(false, done));
	// 		}
	// 	}else if(type === 'ADDCOLUMN') {
	// 		for(let i = 0; i < rowLength; i++) {
	// 			db.query(`INSERT into texts (id_row, id_column, text, id_user) VALUES (${i}, ${columnLength}, ' ', ${idUser})`).then(done => resultQuery(false, done));
	// 		}
	// 	}
	// }

	// function removeFields(type, index) {
	// 	if(type === 'REMOVEROW') {
	// 		one = db.query(`DELETE FROM texts WHERE id_row = ${index - 1} AND id_user = ${idUser}`).then(done => resultQuery(false, done));
	// 	}else if(type === 'REMOVECOLUMN') {
	// 		one = db.query(`DELETE FROM texts WHERE id_column = ${index - 1} AND id_user = ${idUser}`).then(done => resultQuery(false, done));
	// 	}

	// }

	// function updateCell(value, idRow, idCol) {
	// 	db.query(`UPDATE texts SET text = '${value}' WHERE id_row = ${idRow} AND id_column = ${idCol} AND id_user = ${idUser}`).then(done => resultQuery(false, done));
	// }

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