"use strict";
// scripts/rabbitmq-connect.ts
exports.__esModule = true;
var callback_api_1 = require("amqplib/callback_api");
var amqpUrl = 'amqp://localhost';
(0, callback_api_1.connect)(amqpUrl, function (error, connection) {
    if (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        return;
    }
    console.log('Connected to RabbitMQ successfully');
    // Optionally close the connection if needed
    connection.close();
});
