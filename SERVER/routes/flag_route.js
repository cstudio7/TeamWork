import Auth from '../usingDB/middleware/checkAuth';
import Flag from '../usingDB/controller/flagController';
import reportAdValidation  from '../usingDB/validation/FlagAd';

const express = require('express');

const router = express.Router();

// protected route to report a posted Car Ad
router.post('/api/v1/flag', reportAdValidation, Auth.checkToken, Flag.createReport);

// protected route to report a posted Car Ad
router.delete('/api/v1/flag/:flagId', Auth.checkToken, Auth.confirmAdmin, Flag.deleteReport);


module.exports = router;
