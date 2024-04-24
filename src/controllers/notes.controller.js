import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNoteCreate = async (req, res, next) => {
    try {
      const data = await NoteService.newNoteCreate(req.body);
      const{titleDescription,createdBy}=data;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: {
            titleDescription,
            createdBy
        },
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };