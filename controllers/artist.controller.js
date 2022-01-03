import ArtistModel from '../models/artist.model.js';
import SongModel from '../models/song.model.js';

ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)

class ArtistController {
    constructor() {
        // console.log('Class artist controller is loaded');
    }
    //list henter et array (mange)
    list = async (req, res) => {
        const orderby = req.query.orderby || 'id'
        const limit = req.query.limit || 10000
        const result = await ArtistModel.findAll({
            attributes: ['id', 'name'],
            limit: Number(limit),
            order: [orderby]
        })
        res.json(result);
    }

    //get henter et object (1)
    get = async (req, res) => {
        const result = await ArtistModel.findAll({
            where: { id: req.params.id },
            include: {
                model: SongModel,
                attributes: ['id', 'title']
            }
        });
        res.json(...result);
    }

    //laver en ny artist
    create = async (req, res) => {
        //req.body består nu er et objekt som har 1 properties med vadiger
        //const laver 1 variabl ud fra properties
        const { name } = req.body;
        if (name) {
            const model = await ArtistModel.create(req.body)
            return res.json({ new: model.id })
        } else {
            res.send(418)
        }
    }


    update = async (req, res) => {
        const { name, id } = req.body;

        if (name && id) {
            const model = await ArtistModel.update(req.body, { where: { id: id } })
            return res.json({ status: true })
        } else {
            res.send(418)
        }
    }

    delete = async (req, res) => {
        try {
            await ArtistModel.destroy({ where: { id: req.params.id } })
            res.sendStatus(200)
        }
        catch (err) {
            res.send(err)
        }
    }

    //min search 
    search = async (req, res) => {
        const result = await ArtistModel.findAll({
            where: {
                name: {
                    //lige som i Heidi så sætter vi % ind
                    [Op.like]: `%${req.query.keyword}%`
                }
            },
            attributes: ['id', 'name'],
            include: {
                model: SongModel,
                attributes: ['id', 'title']
            }
        })
        res.json(result)
    }
}

export default ArtistController;