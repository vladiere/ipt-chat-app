import { Sequelize } from 'sequelize';
import config from '../configs/config';

const params = {
  database: config.postgres.database,
  username: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  dialect: 'postgres'
}

const sequelize = new Sequelize(params);

const testConnection = () => {
  try {
    await sequelize.authenticate();
    console.info('Connection has been established successfully');
  } catch (error) {
    console.error('Connection error: ', error);
    throw error;
  }
}

const query = async (query, value = []) => {
  try {
    const result = await sequelize.query(query, {
      replacements: values,
      type: Sequelize.QueryTypes.SELECT,
    })
  } catch (error) {
    console.error('Error executing query: ', error);
    throw error;
  }
}

module.exports = query;
