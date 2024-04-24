import Note from '../models/note.model';

export const newNoteCreate = async (body) => {
    const data = await Note.create(body);
    return data;
  };