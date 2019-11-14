import { body, validationResult } from 'express-validator';

const validateSignUp = [
  body('email')
      .exists()
      .isEmail()
      .isLength({ min: 1, max: 50 })
      .withMessage('email should not be empty and should include @')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'email should not be empty and should include @',
      });
    }
    next();
  },
  body('reason')
    .exists()
    .isLength({ min: 3, max: 50 })
    .withMessage('Please a geniue reason ')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'Please state a geniue reason',
      });
    }
    next();
  },
  body('description')
    .exists()
    .isLength({ min: 10, max: 500 })
    .withMessage('description should not be empty, should be descriptive and must contain more than 10 words')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'description should not be empty, should be descriptive and must contain more than 10 words',
      });
    }
    next();
  },
];

export default validateSignUp;
