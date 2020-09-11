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
app.post('/user', function (req, res) {
  const { email, name, lastName } = req.body;
  const post = {
    id: uuid.v1(),
    email: email,
    date: new Date().toISOString(),
    name: name,
    lastName: lastName
  };
  return db.put({
    TableName: usersTable,
    Item: post
  }).promise().then(() => {
    callback(null, response(201, post))
  })
  .catch(err => response(null, response(err.statusCode, err)));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
module.exports.handler = serverless(app);
