const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '5114',
  host: 'localhost',
  port: 5432,
  database: 'notification_service',
});

const serverConnection = pool.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database:', error);
  });

const promisifyQuery = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values)
      .then((result) => {
        console.log('Successfully executed query:', query);
        resolve(result.rows);
      })
      .catch((error) => {
        console.error('Failed to execute query:', query);
        reject(error);
      });
  });
};
const responseForward = (data, msg, res, status = 200) => {
    if (!data) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, msg);
    }
  
    return res.status(status).json(data);
  };

  module.exports={
    promisifyQuery,
    serverConnection,
    responseForward
  }