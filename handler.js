'use strict';
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const express = require('express')
const app = express();
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});
var uuid = require('uuid');
const port = 3000;

app.use(bodyParser.json({ strict: false }));
AWS.config.update({ region: "eu-west-1" });

const usersTable = "users";

app.post('/user', function (req, res) {
  const { email, name, lastName } = req.body;
  console.log("inside post user")
  const post = {
      id: uuid.v1(),
      email: email,
      date: new Date().toISOString(),
      name: name,
      lastName: lastName
  };
  try {
    console.log(post);
    console.log(usersTable);
    db.put({
      TableName: usersTable,
      Item: post
    }, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    console.log(post);
    res.json({ post }).status(201);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'Could not create user' });
}
})

app.get('/user', function (req, res) {
    console.log("test");
    res.status(201).json( {message: 'post'});
})

app.listen(port,  () => {
  console.log(`Example app listening at port 3000`)
})
module.exports.handler = serverless(app);
