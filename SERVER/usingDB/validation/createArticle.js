import { body, validationResult } from 'express-validator';

const validateSignUp = [
  body('title')
    .exists()
    .isLength({ min: 5, max: 50 })
    .withMessage('title should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'title should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },

  body('article')
      .exists()
      .isLength({ min: 50, max: 500 })
      .withMessage('article should not be empty, should be more than 50 words and less than 500 words')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'article should not be empty, should be more than 50 words and less than 500 words',
      });
    }
    next();
  }
];

export default validateSignUp;
