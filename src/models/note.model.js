import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    titleDescription: {
      type: String
    },
    color: {
      type: String
    },
    isArchive: {
      type: String,
    },
    isTrash: {
      type: String
    },
    ccreatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export default model('Note', noteSchema);