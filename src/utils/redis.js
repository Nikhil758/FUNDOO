import { createClient } from 'ioredis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
export default client;
