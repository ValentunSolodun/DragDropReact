module.exports = {
  secret: 'password',
  swagger: {
    swaggerDefinition: {
      info: {
        title: 'DragAndDrop API',
        version: '1.0.0',
      },
      host: 'localhost:3001',
      basePath: '/',
      produces: [
        "application/json",
      ],
      schemes: ['http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'token',
          description: "",
        }
      }
    },
    basedir: __dirname,
    files: [
      './routes/projects.js',
      './routes/tasks.js',
      './routes/statuses.js',
      './routes/routeSingleTask/singleTask.js',
      './routes/taskStatuses.js'
    ]
  }
}
;
