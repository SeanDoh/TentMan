const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const path = require('path');
//const encoder = require('./src/encoder')
const server = require('fastify')({
  logger: process.env.ENV === 'live' ? false : (process.env.ENV === 'test' ? true : true)
})

server
  .register(require('fastify-static'), { root: path.join(__dirname, '..', 'frontend\/build') })
  //.register(require('fastify-static'), { root: path.join(__dirname, 'manifests'), prefix:'/manifests/', decorateReply: false })
  .register(require('fastify-cors'), {})
  .register(require('./src/config/database'))
  .register(require('./src/climate'))
  .register(require('./src/camera'))
  .register(require('./src/events'))

server.get('/', async (request, reply) => {
  try {
    reply.redirect('/home');
  }
  catch (e) {
    reply.code(500).send({error: 'error'});
  }
});

server.get('/home', async (request, reply) => {
  try {
    reply.sendFile('index.html');
  }
  catch (e) {
    reply.code(500).send({error: 'error'});
  }
});

server.get('/video', async (request, reply) => {
  try {
    reply.sendFile('file.mp4', path.join(__dirname, 'video'));
  }
  catch (e) {
    reply.code(500).send({error: 'error'});
  }
});

// react router catch all
server.get('/pages/*', async (request, reply) => {
  try {
    reply.sendFile('index.html');
  }
  catch (e) {
    reply.code(500).send({error: 'error'});
  }
});

//server.get('/stream', async (request, reply) => {
//  console.log(path.join(__dirname, '..','..','frontend\/build\/manifests'))
//  try {
//    reply.sendFile('manifest.mpd', path.join(__dirname, '..','frontend\/build\/manifests'));
//  }
//  catch (e) {
//    reply.code(500).send({error: 'error'});
//  }
//});

const start = async () => {
  try {
    //await encoder();
    await server.listen(9000);
  } catch (err) {
    server.log.error(err)
    process.exit(1);
  }
}

start();