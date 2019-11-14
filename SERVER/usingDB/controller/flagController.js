import '@babel/polyfill';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import jwt from "jsonwebtoken";
import Util from '../utils/gifutils';

const util = new Util();


class Flag  {
  /**
   * Create A Flag
   * @param {object} req
   * @param {object} res
   * @returns {object} flag object
   */
  static async createReport(req, res) {
    const text = `INSERT INTO
      flags(id, email, reason, description, created_on, comment_id)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.reason,
      req.body.description,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      req.body.comment_id,
    ];
    if (!req.body.comment_id) {
      util.setError(400, 'Please select a particular comment to be flagged');
      return util.send(res);
    }
    try {
      // handling no input value to flag an Ad.
      const { rows } = await db.query(text, values);
      const dataValues = (rows[0]);
      const note = { message : 'Flagged request reported'};
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

  static async deleteReport(req, res) {
    const findOneQuery = 'SELECT * FROM comments WHERE comment_id=$1 ';

    const deleteOneQuery = 'DELETE FROM comments WHERE comment_id=$1 returning *';

    if (!req.body.comment_id) {
      util.setError(400, 'Please select a particular comment to be flagged');
      return util.send(res);
    }

    try {
      const { rows } = await db.query(findOneQuery,[req.body.comment_id]) ;
      if (!rows[0]){
        util.setError(400, 'Comment not found');
        return util.send(res);
      }
      const response = await db.query(deleteOneQuery, [req.body.comment_id]);
      const dataValues = response.rows[0];
      const note = { message : 'Comment deleted Successfully'};
      const data = {...note, ...dataValues};
      util.setSuccess(200, data);
      return util.send(res);;
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }


}

export default Flag;
