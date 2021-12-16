import db from '../config/db.config.js';

class UserModel {
    constructor() {
        console.log('Class model is loaded');
    }
    //list giver mig begrænset antal resultater som er sorteret 
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            const orderBy = req.query.orderBy || 'u.id';
            const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : '';
            //skal password med?
            let sql = `SELECT u.id, u.firstname, u.lastname, u.username, u.email, u.date_of_birth, g.gender
                        FROM user u
                        INNER JOIN gender g
                        ON u.gender_id = g.id
                        ORDER BY ${orderBy}${limit}`;
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    //giver mig alle resultater som stemmer overens med min condition
    get = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT u.id, u.firstname, u.lastname, u.username, u.email, u.date_of_birth, g.gender
                            FROM user u
                            INNER JOIN gender g
                            ON u.gender_id = g.id
                            WHERE u.id = ? `;
            db.query(sql, [req.params.id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(...result)
                }
            })
        })
    }

    create = async (req, res) => {
        return new Promise((resolve, reject) => {
            const arrFormValues = (Object.values(req.body));
            const sql = `INSERT INTO user(firstname, lastname, username, password, email, date_of_birth, gender_id) 
                        VALUES(?,?,?,?,?,?,?)`;
            db.query(sql, arrFormValues, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ status: "OK", id: result.insertId })
                }
            })
        })
    }

    update = async (req, res) => {
        return new Promise((resolve, reject) => {
            //skal være her jeg starter med at undersøge ift kryptering af password req.body...
            const arrFormValues = (Object.values(req.body));
            console.log(arrFormValues);
            const sql = `UPDATE user SET firstname = ?, lastname = ?, username = ?, password = ?, email = ?, date_of_birth = ?, gender_id = ? WHERE id = ?`;
            console.log(sql);

            db.query(sql, arrFormValues, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ status: "OK", id: req.body.id })
                }
            })
        })
    }

    delete = async (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                            FROM user 
                            WHERE id = ?`;
            db.query(sql, [req.params.id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ status: "OK", id: req.body.id })
                }
            })
        })
    }

    search = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT u.firstname
                            FROM user u
                            WHERE u.firstname LIKE ?`;
            //OBS!! søg med stort forbogstav (fx Heinz)
            db.query(sql, [`%${req.query.keyword}%`], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

export default UserModel;