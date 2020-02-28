const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const Users = require("./routes/users");
const Tasks = require("./routes/tasks");
const TaskStatuses = require("./routes/taskStatuses");
const Statuses = require("./routes/statuses");
const Projects = require("./routes/projects");
const jwt = require('jsonwebtoken');
const config = require('./config');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const cors = require('cors');
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use('/users', Users);

app.use('/', (req, res, next) => {

  let token = req.headers.token;

  jwt.verify(token, config.secret, (err, data) => {
    if (err) {
      res.sendStatus(401);
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

app.use(Projects);
app.use("/project", Tasks);
app.use("/task_statuses", TaskStatuses);
app.use("/statuses", Statuses);

app.listen(port, () => console.log('server created on port - ' + port));
