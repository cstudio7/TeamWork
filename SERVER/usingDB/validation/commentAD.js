import { body, validationResult } from 'express-validator';

const commentCheck = [

  body('comment')
      .exists()
      .isLength({ min: 50, max: 500 })
      .withMessage('words should not be empty, should be more than 50 and less than 500 character')
      .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        error: 'words should not be empty, should be more than 50 and less than 500 character',
      });
    }
    next();
  }
];

export default commentCheck;
