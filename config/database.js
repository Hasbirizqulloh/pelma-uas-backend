import { Sequelize } from 'sequelize';

const db = new Sequelize('dbs_pelma', 'faikar', 'dfasofd08git ', {
  host: 'faikar',
  dialect: 'mysql',
});

export default db;
