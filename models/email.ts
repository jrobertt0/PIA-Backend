import { Sequelize, Model, DataTypes } from 'sequelize';
import { getSequelize } from '../utilities/database'

const sequelize: Sequelize = getSequelize()

class Email extends Model { }

Email.init({
    email: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: '0000-00-00 00:00:00'
    }
}, { sequelize , modelName: 'email' });

export default Email;