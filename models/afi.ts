import { Sequelize, Model, DataTypes } from 'sequelize';
import { getSequelize } from '../utilities/database'

const sequelize: Sequelize = getSequelize()

class Afi extends Model { }

Afi.init({
    organized_by: DataTypes.STRING,
    area: DataTypes.STRING,
    event: DataTypes.STRING,
    date_time_start: DataTypes.DATE,
    date_time_end: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    occupied: DataTypes.INTEGER,
    available: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: '0000-00-00 00:00:00'
    }
}, { sequelize , modelName: 'afi' });

export default Afi;