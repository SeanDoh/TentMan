const fastifyPlugin = require('fastify-plugin');
const mariadb = require('mariadb');

let dbConnector = async function (fastify, options) {
  try {
    const pool = mariadb.createPool({
      host: 'localhost',
      user: 'root',
      database: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      connecionLimit: 10
    });
    console.log("Database is connected");
    fastify.decorate('dbpool', pool);
  } catch (err) {
    console.log(err);
  }
}

module.exports = fastifyPlugin(dbConnector);