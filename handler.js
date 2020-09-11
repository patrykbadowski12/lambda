'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});
var uuid = require('uuid');

const usersTable = "users";

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.createUser = (event, context, callback) => {
  const post = {
    id: uuid.v1(),
    email: event.email,
    date: new Date().toISOString(),
    name: event.name,
    lastName: event.lastName
  };
  return db.put({
    TableName: usersTable,
    Item: post
  }).promise().then(() => {
    callback(null, response(201, post))
  })
  .catch(err => response(null, response(err.statusCode, err)));
}
