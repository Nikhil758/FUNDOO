import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';
import client, { getAllNotesForUser } from '../utils/redis';
/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNoteCreate = async (req, res, next) => {
  try {
    req.body.createdBy = res.locals.user.email;
    const data = await NoteService.newNoteCreate(req.body);
    client.set(`note:${res.locals.user._id}:${data._id}`,data);
    const { _id, title } = data;
    const user_id = res.locals.user.id;
    const createdBy = res.locals.user.email;
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Note created successfully',
      data: {
        user_id,
        _id,
        title,
        createdBy
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await getAllNotesForUser(res.locals.user._id);
      if (notes) {
        // User data found in Redis cache, return it
        res.status(HttpStatus.OK).json({
          success: true,
          message: 'Notes found in cache',
          data: JSON.stringify(notes)
        });
      } else {
        // Notes not found in cache, fetch from database
        const data = await NoteService.getAllNotes(res.locals.user.email);

        // Cache notes data in Redis
        client.set(`note:${res.locals.user._id}:${data._id}`, JSON.stringify(data));

        res.status(HttpStatus.OK).json({
          success: true,
          message: 'Notes found in database',
          data: data
        });
      }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNoteById = async (req, res, next) => {
  try {
    const note = await client.get(`note:${res.locals.user._id}:${req.params._id}`);
    if(note){
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Note found in cache',
        data: note
      });
    }else{
    const data = await NoteService.getNoteById(req.params._id);
    client.set(`note:${res.locals.user._id}:${req.params._id}`,data);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Note fetched successfully',
      data: data
    });
  }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to toggle isArchive
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archive = async (req, res, next) => {
  try {
    const data = await NoteService.archive(req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Toggled isArchive successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to toggle isTrash
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trash = async (req, res, next) => {
  try {
    const data = await NoteService.trash(req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Toggled isTrash successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
  try {
    await client.del(`note:${res.locals.user._id}:${req.params._id}`)
    const data = await NoteService.updateNote(req.params._id, req.body);
    await client.set(`note:${res.locals.user._id}:${req.params._id}`,data);
    const { _id, title } = data;
    const user_id = res.locals.user.id;
    const createdBy = res.locals.user.email;
    res.status(HttpStatus.ACCEPTED).json({
      success: true,
      message: 'Note updated successfully',
      data: {
        user_id,
        _id,
        title,
        createdBy
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    await client.del(`note:${res.locals.user._id}:${req.params._id}`)
    await NoteService.deleteNote(req.params._id);
    const user_id = res.locals.user.id;
    const user_mail = res.locals.user.email;
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Note deleted successfully',
      data: {
        user_id,
        user_mail
      }
    });
  } catch (error) {
    next(error);
  }
};
