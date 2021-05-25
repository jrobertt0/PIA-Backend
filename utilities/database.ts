import { Sequelize } from 'sequelize';
import 'dotenv/config.js';

const dbHost = process.env.HOST || "localhost";
const user = process.env.USER || "";
const password = process.env.PASSWD || "";

const sequelize = new Sequelize('nt', user, password, {
    dialect: 'mysql',
    port: 3307,
    host: dbHost
});

export function getSequelize(): Sequelize {
    return sequelize
} 
