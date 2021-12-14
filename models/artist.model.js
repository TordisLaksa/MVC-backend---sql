import db from '../config/db.config.js';

class ArtistModel {
    constructor() {
        console.log('Class artist model is loaded');
    }
    //list giver mig begrænset antal resultater som er sorteret 
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            const orderBy = req.query.orderBy || 'id';
            const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : '';
            let sql = `SELECT id, name AS artist
                        FROM artist 
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
            const sql = `SELECT id name AS artist
                            FROM artist
                            WHERE id = ? `;
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
            const sql = `INSERT INTO artist(name) 
                        VALUES(?)`;
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
            const arrFormValues = (Object.values(req.body));
            console.log(arrFormValues);
            const sql = `UPDATE artist SET name = ? WHERE id = ?`;
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
                            FROM artist 
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
            const sql = `SELECT name
                            FROM artist 
                            WHERE name LIKE ?`;
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

export default ArtistModel;