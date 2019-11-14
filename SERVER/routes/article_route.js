
import express from 'express';
import article from '../usingDB/controller/articleController';
import Auth from '../usingDB/middleware/checkAuth';
import createArticleValidation from '../usingDB/validation/createArticle';
import commentCheck from '../usingDB/validation/commentAD'

const router = express.Router();

// protected route to post an article
router.post('/api/v1/article', createArticleValidation, Auth.checkToken, article.postArticle);

// // protected route to update an article
 router.patch('/api/v1/article/:articleId', Auth.checkToken, article.updateArticle);

// // protected route to delete an article
router.delete('/api/v1/article/:articleId', Auth.checkToken, article.deleteArticle);

// protected route to comment on an article
router.post('/api/v1/article/:articleId/comment', Auth.checkToken, commentCheck, article.commentOnAnArticle);

// // protected route to get a specific article
router.get('/api/v1/article/:articleId', Auth.checkToken, article.viewSpecificArticle);

// // protected route to get feed
router.get('/api/v1/feed', Auth.checkToken, article.viewFeed);



module.exports = router;
