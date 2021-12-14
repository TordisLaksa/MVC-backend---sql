import db from '../config/db.config.js';

class SongModel {
    constructor() {
        console.log('Class model is loaded');
    }
    //list giver mig begrænset antal resultater som er sorteret 
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            const orderBy = req.query.orderBy || 's.id';
            const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : '';
            let sql = `SELECT s.id, s.title, a.name AS artist
                        FROM song s
                        INNER JOIN artist a
                        ON s.artist_id = a.id
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
            const sql = `SELECT s.id, s.title, s.content, s.artist_id, a.names AS artist, s.created
                            FROM song s
                            INNER JOIN artist a
                            ON s.artist_id = a.id
                            WHERE s.id = ? `;
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
            const sql = `INSERT INTO song(title, content, artist_id) 
                        VALUES(?,?,?)`;
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
            const sql = `UPDATE song SET title = ?, content = ?, artist_id = ? WHERE id = ?`;
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
                            FROM song 
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
            const sql = `SELECT s.title
                            FROM song s
                            WHERE s.title LIKE ?`;
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

export default SongModel;