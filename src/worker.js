import amqp from 'amqplib/callback_api.js';

const rabbitmqUrl = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}`
  + `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

amqp.connect(rabbitmqUrl, function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'Avengers';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, { noAck: true });
  });
});