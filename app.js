require("dotenv").config();

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
const UserRouter = require('./routes/user')
const TodolistRouter = require('./routes/todolist')

const port = 3000

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/todolist", TodolistRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


