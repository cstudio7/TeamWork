
import '@babel/polyfill';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import jwt from 'jsonwebtoken';
import Util from '../utils/gifutils';

const util = new Util();


class Article {


  /**
   * Create an Article
   * @param {object} req
   * @param {object} res
   * @returns {object} article object
   */
  static async postArticle(req, res) {
    const text = `INSERT INTO
      articles(article_id, created_on, title, article, author_id)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
      const token = req.headers['x-access-token'] || req.query.token || req.body.token;
      const decode = jwt.verify(token, process.env.TOKEN);
      const author_id = decode.id;
    const values = [
      uuidv4(),
      moment().format('YYYY-MM-DD HH:mm:ss'),
      req.body.title,
      req.body.article,
      author_id
    ];
    try {
      // handling no input for creating a purchase order
      const { rows } = await db.query(text, values);
      const dataValues = (rows[0]);
      const note = { message : 'Article successfully posted'};
      const data = {...note, ...dataValues};
      util.setSuccess(200, data);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }


  /**
 * Update an Article
 * @param {object} req
 * @param {object} res
 * @returns {object} updated an article
 */
 static async updateArticle(req, res) {
      const token = req.headers['x-access-token'] || req.query.token || req.body.token;
      const decode = jwt.verify(token, process.env.TOKEN);
      const author = decode.id;
  const findOneQuery = 'SELECT * FROM articles WHERE article_id=$1 AND author_id=$2';

  const updateOneQuery = `UPDATE articles
    SET created_on=$1, article=$2
    WHERE article_id=$3 returning *`;

    if (!req.body.author_id || !req.body.article || !req.body.article_id) {
      util.setError(400, 'Please select an article to be updated');
      return util.send(res);
    }
    if(req.body.author_id !== author) {
        util.setError(400, 'You are cannot only update your post');
        return util.send(res);
    }

        try {
      const { rows } = await db.query(findOneQuery,[req.body.article_id, req.body.author_id]);
          if (!rows[0]) {
            util.setError(400, 'Article not found');
            return util.send(res);
          }
          const values = [
            moment().format('YYYY-MM-DD HH:mm:ss'),
            req.body.article,
            req.body.article_id
          ];
            const response = await db.query(updateOneQuery, values);
            const dataValues = response.rows[0];
            const note = { message : 'Article Successfully  Updated'};
            const data = {...note, ...dataValues};
            util.setSuccess(200, data);
            return util.send(res);
              }
            catch (err) {
                util.setError(400, error);
                return util.send(res);
    }
 }

/**
* Delete an Article
* @param {object} req
* @param {object} res
* @returns {void} return status code 400
*/

static async deleteArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE article_id=$1 ';

    const deleteOneQuery = 'DELETE FROM articles WHERE article_id=$1 returning *';

    if (!req.body.article_id) {
        util.setError(400, 'Please select an article to be deleted');
        return util.send(res);
    }

    try {
        const { rows } = await db.query(findOneQuery,[req.body.article_id]) ;
        if (!rows[0]){
            util.setError(400, 'Article not found');
            return util.send(res);
        }
        const response = await db.query(deleteOneQuery, [req.body.article_id]);
        const dataValues = response.rows[0];
        const note = { message : 'Article Successfully  Deleted'};
        const data = {...note, ...dataValues};
        util.setSuccess('success', data);
        return util.send(res);;
    } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
}

    /**
     * Comment on an Article
     * @param {object} req
     * @param {object} res
     * @returns {object} comment on an article
     */
    static async commentOnAnArticle(req, res) {
        const token = req.headers['x-access-token'] || req.query.token || req.body.token;
        const decode = jwt.verify(token, process.env.TOKEN);
        const author_id = decode.id;
        const findOneQuery = 'SELECT * FROM articles WHERE article_id=$1';
        const text = `INSERT INTO
      comments(comment_id, gif_article_id, created_on, comment, author_id)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            uuidv4(),
            req.body.gif_id || req.body.article_id,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            req.body.comment,
            author_id
        ];
        if(!req.body.article_id || !req.body.comment){
            util.setError(400, 'Please select an article or gif you want to comment on');
            return util.send(res);
        }
        try{
            const { rows } = await db.query(findOneQuery,[req.body.article_id]);

            const title = {  title : rows[0].title };
            if (!rows[0]) {
                util.setError(400, 'Article not found');
                return util.send(res);
            }
            const response = await db.query(text, values);
            const dataValues = response.rows[0];
            const note = { message : 'comment Successfully  Created'};
            const data = {...note, ...title, ...dataValues};
            util.setSuccess('success', data);
            return util.send(res);
        }
        catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    /**
     * Employee can view a specific article
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view a specific article
     */
    static async viewSpecificArticle(req, res) {
        const findOneQuery = `SELECT article_id, created_on, title, article FROM articles WHERE article_id=$1`;
        const text = `SELECT comment_id, comment, author_id FROM comments WHERE gif_article_id = $1;`;
        if(!req.body.article_id){
            util.setError(400, 'Please select an article you want to comment on');
            return util.send(res);
        }
        try {
            const  crow  = await db.query(text,[req.body.article_id]);
            const { rows } = await db.query(findOneQuery,[req.body.article_id]);
            const comments = crow.rows;
            if (!rows[0]) {
                util.setError(400, 'Article not found');
                return util.send(res);
            }
            const dataValues = rows[0];
            const data = {...dataValues, comments };
            util.setSuccess(200, data);
            return util.send(res);
        }
        catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    /**
     * Employee can view all articles,showing the most recently posted articles  first
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view all articles
     **/
    static async viewFeed(req, res) {
        const findOneQuery = 'SELECT * FROM articles ORDER BY created_on DESC';
        try {
            const { rows } = await db.query(findOneQuery);
            if (!rows[0]) {
                util.setError(400, 'Article not found');
                return util.send(res);
            }
            let dataValues;
            dataValues = rows;
            return res.status(200).send({ status: 'success' , data : dataValues });
        }
        catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }


}

export default Article;
