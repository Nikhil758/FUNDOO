import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNoteCreate = async (req, res, next) => {
    try {
      req.body.createdBy=res.locals.user.email;
      const data = await NoteService.newNoteCreate(req.body);
      const{_id,title}=data;
      const user_id=res.locals.user.id;
      const createdBy=res.locals.user.email;
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Note created successfully',
        data: {
          user_id,
          _id,
          title,
          createdBy,
        }        
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
    const data = await NoteService.updateNote(req.params._id, req.body);
    const {_id,title}=data;
    const user_id=res.locals.user.id;
    const createdBy=res.locals.user.email;
    res.status(HttpStatus.ACCEPTED).json({
      success: true,
      message: 'Note updated successfully',
      data:{
        user_id,
        _id,
        title,
        createdBy,
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
    await NoteService.deleteNote(req.params._id);
    const user_id=res.locals.user.id;
    const user_mail=res.locals.user.email;
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Note deleted successfully',
      data: [{
        user_id,
        user_mail
      }]
    });
  } catch (error) {
    next(error);
  }
};