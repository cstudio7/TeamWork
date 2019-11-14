
import express from 'express';
import User from '../usingDB/controller/userController';
import signInValidation from '../usingDB/validation/signIn';
import signUpValidation from '../usingDB/validation/signUp';
import Authorization from '../usingDB/middleware/checkAuth';

const router = express.Router();

// sign in user
router.post('/api/v1/auth/signin',   signInValidation, User.signIn);

// // sign up a user
router.post('/api/v1/auth/create-user', Authorization.checkToken, Authorization.confirmAdmin, signUpValidation, User.signUp);


module.exports = router;
