import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Users from './UserModel.js';

const { DataTypes } = Sequelize;

const Reports = db.define(
  'reports',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    report_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    report_status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'selesai'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Reports);
Reports.belongsTo(Users, { foreignKey: 'userId' });

export default Reports;
