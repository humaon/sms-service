// scripts/rabbitmq-connect.ts

import { connect } from 'amqplib/callback_api';

const amqpUrl = 'amqp://localhost';

connect(amqpUrl, (error, connection) => {
  if (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    return;
  }
  console.log('Connected to RabbitMQ successfully');

  // Optionally close the connection if needed
  connection.close();
});
