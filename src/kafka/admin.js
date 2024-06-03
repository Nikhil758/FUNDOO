// kafka/admin.js
import { admin } from './kafka';

const init = async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: 'user',
        numPartitions: 1,
        replicationFactor: 1
      },
      {
        topic: 'notes',
        numPartitions: 1
      }
    ]
  });
  await admin.disconnect();
};

export default init;
