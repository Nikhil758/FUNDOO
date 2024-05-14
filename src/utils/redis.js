import { createClient } from 'ioredis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

// Function to fetch all notes for a user
export const getAllNotesForUser = async (userId) => {
  try {
    const noteKeys = await client.keys(`note:${userId}:*`);
    if (!noteKeys.length) {
      return null;
    }

    const notesData = await client.mget(noteKeys);
    const notes = notesData.map(data => data);
    return notes;
  } catch (error) {
    throw error;
  }
};

export default client;
