import Note from '../models/note.model';

//Create a note
export const newNoteCreate = async (body) => {
    const data = await Note.create(body);
    return data;
  };

//Get all notes
export const getAllNotes = async (createdBy) => {
    const data = await Note.find({createdBy},{title: 1});
    return data;
  };

 //update single note
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single note
export const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
  return '';
};