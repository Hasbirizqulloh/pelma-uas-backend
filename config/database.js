import { Sequelize } from 'sequelize';

const db = new Sequelize('dbs_pelma', 'faikar', 'dfasofd08', {
  host: 'faikar',
  dialect: 'mysql',
});

export default db;
