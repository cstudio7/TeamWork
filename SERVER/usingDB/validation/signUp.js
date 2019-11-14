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
        error: 'email should not be empty and should include @ format',
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
  body('first_name')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('first_name should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'first_name should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('last_name')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('last_name should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'last_name should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('department')
      .exists()
      .isLength({ min: 5, max: 50 })
      .withMessage('department should not be empty')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'department should not be empty',
      });
    }
    next();
  },
  body('job_role')
      .exists()
      .isLength({ min: 5, max: 50 })
      .withMessage('job_role should not be empty and should be descriptive')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'job_role should not be empty and should descriptive',
      });
    }
    next();
  },
  body('address')
      .exists()
      .isLength({ min: 5, max: 50 })
      .withMessage('address should not be empty and should be more than 5 words')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'address should not be empty and should be more than 5 words',
      });
    }
    next();
  },
  body('gender')
      .exists()
      .isLength({ min: 4, max: 50 })
      .isIn(['male', 'female'])
      .withMessage('Please specify the gender status')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'Please specify the gender status',
      });
    }
    next();
  },
  body('is_admin')
      .exists()
      .isLength({ min: 4, max: 50 })
      .isIn(['true', 'false'])
      .withMessage('Please specify status')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'Please specify your status',
      });
    }
    next();
  }
];

export default validateSignUp;
