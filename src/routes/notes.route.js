import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newNotesValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, notesController.getAllNotes);

router.get('/:_id', userAuth, notesController.getNoteById);

router.post('', userAuth, newNotesValidator, notesController.newNoteCreate);

router.put('/archive/:_id', userAuth, notesController.archive )

router.put('/trash/:_id', userAuth, notesController.trash )

router.put('/:_id', userAuth, notesController.updateNote);

router.delete('/:_id', userAuth, notesController.deleteNote);

export default router;
