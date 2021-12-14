import express from 'express';
import dotenv from 'dotenv';

//fordi den bliver importeret og vi kan give den en alias med at skrive as
import { router as SongRouter } from './Routes/song.router.js';
import { router as ArtistRouter } from './Routes/artist.router.js';

//kalder environment vars
dotenv.config();

const port = process.env.PORT || 3030;

//express er et framework
const app = new express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use(SongRouter);
app.use(ArtistRouter);

app.listen(port, () => {
    console.log(`Server kører på port http://localhost:${port}`);
})