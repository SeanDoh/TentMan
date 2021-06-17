const fastifyPlugin = require('fastify-plugin');
const { eventSchema } = require('./schema');

const eventsService = async function (server, options) {
  server.get(
    '/events',
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        let query = await conn.query("SELECT id, title, details, event_date as 'date' FROM events");
        return { data: query };
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
  server.post(
    '/events',
    { schema: eventSchema },
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        let res;
        // if we get id, update record
        if(req.body.id){
          console.log([req.body.title, req.body.details, new Date(req.body.event_date), req.body.id])
          res = await conn.query(
            'UPDATE events SET title = ?, details = ?, event_date = ? WHERE id = ?',
            [req.body.title, req.body.details, new Date(req.body.event_date), req.body.id],
          );
        }
        else{
          res = await conn.query(
            'INSERT INTO events (title, details, event_date) VALUES (?,?,?)',
            [req.body.title, req.body.details, new Date(req.body.event_date)],
          );
        }
        return( {id: res.insertId});
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
  server.delete(
    '/events',
    async (req, reply) => {
      let conn;
      try {
        conn = await server.dbpool.getConnection();
        let query = await conn.query("DELETE FROM events where id = ?", req.body.id);
        console.log(query)
        reply.code(204);
      } catch (error) {
        reply.code(500).send({ error: 'server error'});
      } finally {
        if (conn) conn.end();
      }
    }
  )
}

module.exports = fastifyPlugin(eventsService);