import express from 'express';

const router = express.Router();

//kalder routes med controller function
router.get('/api/artists', (req, res) => {
    //kommer ikke frem i browseren, hvis vi console logger
    res.status(200).send('Artist liste');
});

export { router }