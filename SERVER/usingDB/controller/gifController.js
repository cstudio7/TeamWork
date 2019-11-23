import '@babel/polyfill';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Util from '../utils/gifutils';


const util = new Util();


class Gif  {
  /**
 * Create A Gif Ad
 * @param {object} req
 * @param {object} res
 * @returns {object} car object
 */

  static async createAd(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    let result;
    let gif_url;

    // checks if Car Ad image is present to upload to cloudinary account
    if (req.files) {
      if (req.files.gif_url) {
        const filename = req.files.gif_url.path;
        result = await cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
          .catch((err) => {
            if (err) {
              util.setError(400, 'invalid authentication');
              return util.send(res);
            }
          });
        gif_url = result.secure_url;
      }
    }
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    const decode = jwt.verify(token, process.env.TOKEN);
    const author_id = decode.id;
    const text = `INSERT INTO
    gifs(gif_id, created_on, title, gif_url, author_id)
    VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      moment().format('YYYY-MM-DD HH:mm:ss'),
      req.body.title,
      gif_url,
      author_id
    ];
    if(!gif_url){
      util.setError(400, 'Please select a gif image');
      return util.send(res);
    }
    try {
      // post Gif Ad
      const { rows } = await db.query(text, values);
      const dataValues = rows[0];
      const note = { message : 'GIF image successfully posted'};
      const data = {...note, ...dataValues};
      util.setSuccess(200, data);
      return util.send(res);
    } catch (error) {
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

  static async deleteGif(req, res) {
    const findOneQuery = 'SELECT * FROM gifs WHERE gif_id=$1 ';

    const deleteOneQuery = 'DELETE FROM gifs WHERE gif_id=$1 returning *';

    if (!req.body.gif_id) {
      util.setError(400, 'Please select an article to be deleted');
      return util.send(res);
    }

    try {
      const { rows } = await db.query(findOneQuery,[req.body.gif_id]) ;
      if (!rows[0]){
        util.setError(400, 'gif not found');
        return util.send(res);
      }
      const response = await db.query(deleteOneQuery, [req.body.gif_id]);
      const dataValues = response.rows[0];
      const note = { message : 'gif post successfully deleted'};
      const data = {...note, ...dataValues};
      util.setSuccess(200, data);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   * Comment on a Gif
   * @param {object} req
   * @param {object} res
   * @returns {object} comment on a gif
   */
  static async commentOnGif(req, res) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    const decode = jwt.verify(token, process.env.TOKEN);
    const author_id = decode.id;
    const findOneQuery = 'SELECT * FROM gifs WHERE gif_id=$1';
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
    if(!req.body.gif_id || !req.body.comment){
      util.setError(400, 'Please select an article or gif you want to comment on');
      return util.send(res);
    }
    try{
      const { rows } = await db.query(findOneQuery,[req.body.gif_id]);

      const title = {  title : rows[0].title };
      if (!rows[0]) {
        util.setError(400, 'Image not found');
        return util.send(res);
      }
      const response = await db.query(text, values);
      const dataValues = response.rows[0];
      const note = { message : 'comment Successfully  Created'};
      const data = {...note, ...title, ...dataValues};
      util.setSuccess(200, data);
      return util.send(res);
    }
    catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   * Employee can view a specific gif
   * @param {object} req
   * @param {object} res
   * @returns {object} Employee can view a specific gif
   */
  static async viewSpecificGif(req, res) {
    const findOneQuery = `SELECT gif_id, created_on, title, gif_url FROM gifs WHERE gif_id=$1`;
    const text = `SELECT comment_id, comment, author_id FROM comments WHERE gif_article_id = $1;`;
    if(!req.body.gif_id){
      util.setError(400, 'Please select a gif you want to comment on');
      return util.send(res);
    }
    try {
      const  crow  = await db.query(text,[req.body.gif_id]);
      const { rows } = await db.query(findOneQuery,[req.body.gif_id]);
      const comments = crow.rows;
      if (!rows[0]) {
        util.setError(400, 'Image not found');
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
  static async viewFeeds(req, res) {
    const findOneQuery = 'SELECT * FROM gifs ORDER BY created_on DESC';
    try {
      const { rows } = await db.query(findOneQuery);
      if (!rows[0]) {
        util.setError(400, 'Image not found');
        return util.send(res);
      }
      const dataValues = rows;
      return res.status(200).send({ status: 'success' , data : dataValues });
    }
    catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

}

export default Gif;
