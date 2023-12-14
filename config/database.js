import { Sequelize } from 'sequelize';

const db = new Sequelize('dbs_pelma', 'faikar', 'dfasofd08git ', {
  host: 'faikarmoht.my.id',
  dialect: 'mysql',
});

export default db;
