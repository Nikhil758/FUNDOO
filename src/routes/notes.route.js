import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/note.validator';

const router = express.Router();

router.post('', newNotesValidator, notesController.newNoteCreate);

export default router;
