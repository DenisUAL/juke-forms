const http = require('http');
const express = require('express');

const app = express();

const PORT = 1337;

const server = http.createServer();

const cartoons = [
  'Steven Universe',
  'Adventure Time',
  'Regular Show'
]

app.use('/', (req, res, next) => {
  const user = req.query.user;
  req.user = user;
  next();
})

app.use('/', (req, res, next) => {
  console.log('current user', req.user);
  next();
})

app.get('/cartoons/:id', (req, res, next) => {
  const index = req.params.id;
  if ( cartoons[index]) res.send(cartoons[index]);
  else {
    const err = {message: 'No cartoon with that Id', status: 404}
    next(err);
  }
})

app.get('/cartoons/all', (req, res) => {
  const cartoonHTML = `<h1>Cartoons</h1><ul>${cartoons.map(cartoon => `<li>${cartoon}</li>`).join('\n')}</ul>`;
  //res.writeHead(200, {'Content-type': 'text/html'})
  res.send(cartoonHTML);
})



app.use('/', (err, req, res, next ) => {
  res.status(err.status);
  res.send(err.message);
})

server.listen(PORT, () => {
  console.log(`Listening impatiently on port ${PORT}`);
});

server.on('request', app);


// (req, res) => {
//   console.log('url', req.url);
//   if (req.url === '/cartoons' && req.method === 'GET') {
//     const cartoonHTML = `<h1>Cartoons</h1><ul>${cartoons.map(cartoon => `<li>${cartoon}</li>`).join('\n')}</ul>`;
//     res.writeHead(200, {'Content-type': 'text/html'})
//     res.end(cartoonHTML);
//   } else {
//     res.writeHead(200, {'Content-type': 'text/plain'})
//     res.end('Hello!');
//   }
