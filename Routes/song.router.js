import express from 'express';
import SongController from '../controllers/song.controller.js';

const router = express.Router();
//constanten er et object
const controller = new SongController();

//kalder routes med controller function
router.get('/api/songs', (req, res) => { controller.list(req, res) });
router.get('/api/songs/:id([0-9]*)', (req, res) => { controller.get(req, res) });
router.post('/api/songs', (req, res) => { controller.create(req, res) });
//kalder den update for at gøre det nemmere at forstå (navngivningen skal bare matche i min 
//controller osv, men kunne også være kage)
router.put('/api/songs', (req, res) => { controller.update(req, res) });
router.delete('/api/songs/:id([0-9]*)', (req, res) => { controller.delete(req, res) });

//her prøver jeg at gøre klar til at kunne søge
router.get('/api/songs/search', (req, res) => { controller.search(req, res) });


//named export
export { router };