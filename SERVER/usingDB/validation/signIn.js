import { body, validationResult } from 'express-validator';

const validateSignIn = [
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
  body('password')
    .exists()
    .isLength({ min: 5, max: 50 })
    .withMessage('password should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'password should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
];

export default validateSignIn;
