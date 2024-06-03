// utils/kafka.js
import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

export const admin = kafka.admin();
export const producer = kafka.producer();
