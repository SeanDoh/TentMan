const fastifyPlugin = require('fastify-plugin');
const { cameraSchema } = require('./schema');

const cameraService = async function (server, options) {
  server.get(
    '/camera',
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        let query = await conn.query('SELECT id, name, url, hours_to_keep FROM camera');
        return { data: query };
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
  server.post(
    '/camera',
    { schema: cameraSchema },
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        const query = await conn.query(
          'INSERT INTO climate_sensor (name, url, hours_to_keep, created) VALUES (?,?,?,?)',
          [req.body.name, req.body.url, req.body.hours_to_keep, new Date()]
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

module.exports = fastifyPlugin(cameraService);