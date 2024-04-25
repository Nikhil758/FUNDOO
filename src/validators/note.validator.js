import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(4),
    color: Joi.string().min(2),
    isArchive: Joi.string().min(4).max(5).required(),
    isTrash: Joi.string().min(4).max(5).required(),
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