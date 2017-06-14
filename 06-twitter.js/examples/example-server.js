'use strict';

const http = require('http');
const EOL = require('os').EOL;

const requestResponseHandler = function (req, res) {

  // server window, does not go to client
  console.log('Received request!', req.method, req.url);

  // starting to respond to client
  res.writeHead(200, { 'Content-Type': 'text/plain'});
  res.write('Here is part of a…' + EOL);

  setTimeout(function(){

    // completing the response to the client, depending on what they asked for.
    if (req.url === '/greeting') {
      res.end('…lovely greeting. Salutations!' + EOL);
    } else if (req.url === '/funfact') {
      res.end('…fun fact. Dolphins sleep half their brain at a time.' + EOL);
    } else {
      res.end('…neutral response. This is a server. You requested /.' + EOL);
    }

    // server window logging
    console.log('sent response!');

  }, 100);

};

const server = http.createServer(requestResponseHandler);

server.listen(1337);
