// kafka/producer.js
import { producer } from './kafka';

export const produceMessage = async (req) => {
  await producer.connect();
  await producer.send({
    topic: 'user',
    messages: [
      {
        partition: 0,
        key: 'name',
        value: JSON.stringify(req.body)
      }
    ]
  });
  await producer.disconnect();
};
