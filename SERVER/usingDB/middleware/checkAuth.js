import jwt from 'jsonwebtoken';
import Util from '../utils/gifutils';

const util = new Util();
const dotenv = require('dotenv');


/**
 * Class representing the Authentication methods
 * @class Authorization
 * @description Authenticate protected routes
 */
class Authorization {
  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to invalid token or no token in the request
   */
  static async checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) {
      util.setError(400, 'Access denied. No token provided.');
    return util.send(res);
    }

    next();
  }


  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to unauthorized user
   */
  static async confirmAdmin(req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
            if(decoded.isAdmin === 'false') {
              util.setError(400, 'Access denied, Protect Admin Privilege alone');
              return util.send(res);
            }
      next();
        },
   );
  }
}

export default Authorization;
