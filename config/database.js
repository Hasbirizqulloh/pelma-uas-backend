import { Sequelize } from 'sequelize';

const db = new Sequelize('dbs_pelma', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
