import Note from '../models/note.model';

//Create a note
export const newNoteCreate = async (body) => {
  const data = await Note.create(body);
  return data;
};

//Get all notes
export const getAllNotes = async (email) => {
  const data = await Note.find({ createdBy: email }, { title: 1 });
  return data;
};

// Get note by id
export const getNoteById = async (_id) => {
  const data = await Note.findOne({ _id }, { title: 1, description: 1 });
  return data;
};

//isArchive
export const archive = async (_id) => {
  const d = await Note.findById(
    { _id },
    { title: 1, isArchive: 1, createdBy: 1 }
  );
  d.isArchive = !d.isArchive;
  const data = await d.save();
  return data;
};

//isTrash
export const trash = async (_id) => {
  const d = await Note.findById(
    { _id },
    { title: 1, isTrash: 1, createdBy: 1 }
  );
  d.isTrash = !d.isTrash;
  const data = await d.save();
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
