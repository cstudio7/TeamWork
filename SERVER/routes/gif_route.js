import express from 'express';
import multiparty from 'connect-multiparty';
import Gif from '../usingDB/controller/gifController';
import Auth from '../usingDB/middleware/checkAuth';
import postGif from '../usingDB/validation/createAd';
import commentCheck from "../usingDB/validation/commentAD";
const multipartyMiddleware = multiparty();
const router = express.Router();

// protected route to post gif
router.post('/api/v1/gifs', Auth.checkToken,  multipartyMiddleware, postGif,  Gif.createAd);

// protected route to delete gif
router.delete('/api/v1/gif/:gifId', Auth.checkToken, Gif.deleteGif);

// protected route to comment on a gif
router.post('/api/v1/gifs/:gifId/comment', Auth.checkToken, commentCheck, Gif.commentOnGif);

// protected route to get a specific gif
router.get('/api/v1/gif/:gifId', Auth.checkToken, Gif.viewSpecificGif);

// protected route to get feed
router.get('/api/v1/feeds', Auth.checkToken, Gif.viewFeeds);


module.exports = router;
