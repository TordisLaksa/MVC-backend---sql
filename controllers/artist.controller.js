import ArtistModel from '../models/artist.model.js'
const model = new ArtistModel();

class ArtistController {
    constructor() {
        console.log('Class artist controller is loaded');
    }
    //list henter et array (mange)
    list = async (req, res) => {
        const result = await model.list(req, res);
        res.json(result);
    }
    //get henter et object (1)
    get = async (req, res) => {
        const result = await model.get(req, res);
        res.json(result);
    }

    create = async (req, res) => {
        const result = await model.create(req, res);
        res.json(result);
    }

    update = async (req, res) => {
        const result = await model.update(req, res);
        res.json(result);
    }

    delete = async (req, res) => {
        const result = await model.delete(req, res);
        res.json(result);
    }
    //min search 
    search = async (req, res) => {
        const result = await model.search(req, res);
        res.json(result);
    }
}

export default ArtistController;