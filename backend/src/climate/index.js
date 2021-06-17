const fastifyPlugin = require('fastify-plugin');
const { climateReadingSchema, climateGraphSchema } = require('./schema');

const climateService = async function (server, options) {
  server.get(
    '/climatesensor',
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        let query = await conn.query('SELECT date_read, temperature, humidity FROM climate_sensor ORDER BY date_read DESC LIMIT 1');
        return { data: query[0] };
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
  server.get(
    '/climategraph',
    { schema: climateGraphSchema },
    async (req, reply) => {
      let conn;
      try {
        let date = new Date();
        date.setHours(date.getHours() - req.query.hours_back);
        conn = await server.dbpool.getConnection();
        let data = await conn.query('SELECT date_read, temperature, humidity FROM climate_sensor WHERE date_read > ?', [date]);
        return { data };
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
      reply.code(200);
    }
  )
  server.post(
    '/climatesensor',
    { schema: climateReadingSchema },
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        const res = await conn.query(
          'INSERT INTO climate_sensor (sensor_name, temperature, humidity, date_read) VALUES (?,?,?,?)',
          [req.body.sensor_name, req.body.temperature, req.body.humidity, new Date()],
        );
        reply.code(204);
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
}

module.exports = fastifyPlugin(climateService);