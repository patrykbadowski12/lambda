'use strict';
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const express = require('express')
const app = express();
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});
var uuid = require('uuid');
const port = 3000;


const usersTable = "users";

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
app.post('/user', async function (req, res) {
  const { email, name, lastName } = req.body;
  console.log("inside post user");
  const post = {
    id: uuid.v1(),
    email: email,
    date: new Date().toISOString(),
    name: name,
    lastName: lastName
  };
  res.status(200).json(post);
})

app.get('/user', async function (req, res) {
    console.log("test");
    res.status(200).json("OK");
})

app.listen(port,  () => {
  console.log(`Example app listening at port 3000`)
})
module.exports.handler = serverless(app);
