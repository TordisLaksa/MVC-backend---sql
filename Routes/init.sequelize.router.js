import express from 'express';
import { sequelize } from '../config/db.sequelize.js';

const router = express.Router();

/* Modeller der wskal medtage i initialiseringen */
import UserModel from '../models/user.model.js'
import SongModel from '../models/song.model.js'
import ArtistModel from '../models/artist.model.js'

/* Init router */
router.get('/init', (req, res) => {
    try {
        sequelize.sync()
        res.sendStatus(200)
    }
    catch (err) {
        res.send(err)
    }
})


//named export
export { router };