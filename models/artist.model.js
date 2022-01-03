import { sequelize } from '../config/db.sequelize.js';
import { Sequelize, DataTypes, Model } from 'sequelize';

class ArtistModel extends Model { }

ArtistModel.init({
    //Id vil næsten altid være sådan her
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled'
    },

}, {
    sequelize,
    modelName: 'artist',
    freezeTableName: true,
    underscored: true,
    //createdAt: 'created', (den her KAN give problemer)
    //updatedAt: false
})

export default ArtistModel;