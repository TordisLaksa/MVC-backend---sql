import express from 'express';
import dotenv from 'dotenv';

//fordi den bliver importeret og vi kan give den en alias med at skrive as
import { router as SongRouter } from './Routes/song.router.js';
import { router as ArtistRouter } from './Routes/artist.router.js';
import { router as UserRouter } from './Routes/user.router.js';
import { router as InitRouter } from './Routes/init.sequelize.router.js';

//kalder environment vars
dotenv.config();


//express er et framework
const app = new express();


app.use(express.urlencoded({
    extended: true
}));

// det her behøver jeg ikke når jeg får det lavet i min controller?
//app.use(express.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const port = process.env.PORT || 3030;

app.use(SongRouter);
app.use(ArtistRouter);
app.use(UserRouter);
app.use(InitRouter);

app.listen(port, () => {
    console.log(`Server kører på port http://localhost:${port}`);
})