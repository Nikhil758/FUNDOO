import Note from '../models/note.model';

// //get all users
export const getAllNotes = async () => {
  const data = await User.find();
  return data;
};

//Create a note
export const newNoteCreate = async (body) => {
    const data = await Note.create(body);
    return data;
  };

 //update single note
export const updateNote = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
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