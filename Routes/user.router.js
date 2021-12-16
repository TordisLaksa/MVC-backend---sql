import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
//constanten er et object
const controller = new UserController();

//kalder routes med controller function
router.get('/api/user', (req, res) => { controller.list(req, res) });
router.get('/api/user/:id([0-9]*)', (req, res) => { controller.get(req, res) });
router.post('/api/user', (req, res) => { controller.create(req, res) });
//kalder den update for at gøre det nemmere at forstå (navngivningen skal bare matche i min 
//controller osv, men kunne også være kage)
router.put('/api/user', (req, res) => { controller.update(req, res) });
router.delete('/api/user/:id([0-9]*)', (req, res) => { controller.delete(req, res) });

//her prøver jeg at gøre klar til at kunne søge
router.get('/api/user/search', (req, res) => { controller.search(req, res) });


//named export
export { router };