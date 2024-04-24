import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
  const schema = Joi.object({
    titleDescription: Joi.string().min(4).required(),
    color: Joi.string().min(4).required(),
    isArchive: Joi.string().min(2).max(3).required(),
    isTrash: Joi.string().min(2).max(3).required(),
    createdBy: Joi.string().min(4).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};



//regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/)