const {connection} = require('../database/connection');
const {StatusCodes} = require('http-status-codes');
const {validationResult} = require('express-validator');
const moment = require('moment')
const {getUserByEmail} = require("../database/getdata");

class Member {
    // Get all
    static index = async (req, res) => {
        let Data = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', function (error, results) {
                if (error) {
                    return reject(error)
                }
                resolve(results)
            });
        });

        let result = await Data;
        return res.status(StatusCodes.OK).json({message: 'success', data: result});
    }

    // Get by :id
    static show = async (req, res, next) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id=?', [req.params.id], function (error, results) {
                if (error) {
                    return reject(error)
                }
                resolve(results)
            });
        });

        let result = await userData;
        return res.status(StatusCodes.OK).json({message: 'success', data: result});
    }

    // Create a new user
    static create = async function (req, res) {
        try {
            let dateNow = new Date();
            let momentDate = moment(dateNow).format('YYYY-MM-DD');
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            const {first_name, last_name, email, username, date_of_birth} = req.body
            const created_at = momentDate, updated_at = momentDate
            const candidate = await getUserByEmail(email)
            if (candidate[0]) {
                res.json({
                    status: 'error',
                    message: "email already exists"
                })
            }
            await connection.query(`INSERT INTO members(first_name, last_name, email, username, date_of_birth, created_at, updated_at) 
                                    VALUES('${first_name}','${last_name}','${email}', '${username}', '${date_of_birth}','${created_at}','${updated_at}')`,
                (error) => {
                    if (error) throw error;

                });
            return res.status(201).json({message: 'success'});
        } catch (e) {
            return e
        }
    }

    // Update user by :id
    static update = async function (req, res) {
        try {
            let dateNow = new Date(), momentDate = moment(dateNow).format('YYYY-MM-DD')
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            const {first_name, last_name, email, username, date_of_birth} = req.body
            const updated_at = momentDate
            const candidate = await getUserByEmail(email)
            if (candidate[0]) {
                res.json({
                    status: 'error',
                    message: "email already exists"
                })
            }
            await connection.query(`UPDATE members SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}, username = '${username}', date_of_birth = '${date_of_birth}', updated_at = '${updated_at}'`,
                (error) => {
                    if (error) throw error;
                });
            return res.status(201).json({message: 'success'})
        } catch (e) {
            return e
        }
    }

    // Delete user by :id
    static destroy = function (req, res) {
        let sql = `DELETE FROM users WHERE id = ${req.params.id}`
        connection.query(sql, (err) => {
            if (err) throw err
        })
        return res.status(200).json({message: 'success'});
    }

}

module.exports = {Member}