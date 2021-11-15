const {connection} = require('../database/connection');
const {StatusCodes} = require('http-status-codes');
const {validationResult} = require('express-validator');

class User {
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
    static show = async (req, res) => {
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
    static create = function (req, res) {
        const errors = validationResult(req);

        connection.query('INSERT INTO `users` (`name`,`gender`,`dob`) VALUES (?,?,?)', [req.body.name, req.body.gender, req.body.dob], function (error, results, fields) {
            if (error) throw error;

            console.table(results)
        })

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        return res.status(201).json({message: 'success'});
    }

    // Update user by :id
    static update = function (req, res) {
        const errors = validationResult(req)
        connection.query('UPDATE users SET name = ?, gender = ?, dob = ? WHERE id = ${req.params.id}', [req.body.name, req.body.gender, req.body.dob], (err) => {
            if (err) throw err;

        })
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        return res.status(204).json({message: 'success'});
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

module.exports = {User}