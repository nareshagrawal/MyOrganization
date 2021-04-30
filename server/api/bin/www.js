#!/usr/bin/env node

/**
 * Module dependencies.
 */


import app from '../server.js';
import debugLib from 'debug'
import http from 'http';
import socketio from 'socket.io';
const debug = debugLib('server:server');
/**
 * Get port from environment and store in Express.
 */


const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"]
  }
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  //  console.log(bind)
  debug('Listening on ' + bind);
}


// Web Chat Server side code

io.on('connection', socket => {
  const id = socket.handshake.query.id

  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    //  console.log("HERE")
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('recieve-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })

})