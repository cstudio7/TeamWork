
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../db';
import Util from '../utils/gifutils';

const util = new Util();



dotenv.config();


class User  {

    /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    static async signUp(req, res) {
        const text = `INSERT INTO
      Users(id, token, email,  first_name, last_name, password, is_admin, address, gender, job_role, department)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;

        // generate user token
        const userId = uuidv4();
        const payload = { email: req.body.email, id: userId, isAdmin: req.body.is_admin };
        const options = { expiresIn: '70d' };
        const secret = process.env.TOKEN;
        req.body.token = jwt.sign(payload, secret, options);

        const values = [
            userId,
            req.body.token,
            req.body.email,
            req.body.first_name,
            req.body.last_name,
            // eslint-disable-next-line no-unused-vars
            bcrypt.hashSync(req.body.password, 10, (error, hash) => {
                if (error) { return ({ error: 'error found' }); } return null;
            }) || '',
            req.body.is_admin,
            req.body.address,
            req.body.gender,
            req.body.job_role,
            req.body.department
        ];


        try {
            const { rows } = await db.query(text, values);
            const displayMessage = { message : 'User account successfully created'};
            const data = rows[0];
            const dataValues = { ...displayMessage, data }
            util.setSuccess(200, dataValues);
            return util.send(res);
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                util.setError(400, 'User with that EMAIL already exist');
                return util.send(res);
            }
            util.setError(400, error.message);
        }
    }
    /**
     * //sign in a user
     * @param {object} req
     * @param {object} res
     * @returns {object} return user Object
     */
    static async signIn(req, res) {
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);

            if (!rows[0]) {
                util.setError(400, 'A user with the specified email was not found');
                return util.send(res);
            }
            // check if user password is correct
            bcrypt.compare(req.body.password, rows[0].password, (error, result) => {
                if (result) {
                    const data = rows[0];
                    util.setSuccess(200, data);
                    return util.send(res);
                }
                return res.status(401).send({ status: 401, error: 'Authentication information is invalid' });
            });
        } catch (error) {
            util.setError(400, 'please check your internet connection');
            return util.send(res);
        }
        return null;
    }


}


export default User;
