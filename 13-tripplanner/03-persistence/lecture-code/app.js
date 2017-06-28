const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db');
const Herp = db.model('herps_for_sale');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/jquery'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/api/herps', (req, res, next) => {
  Herp.findAll({})
  .then(critters => {
    res.json(critters);
  })
})

app.post('/api/herps', (req, res, next) => {
  Herp.create({
    name: req.body.name,
    price: +req.body.price,
    picture_url: req.body.picture_url
  })
  .then(newHerp => {
    res.send(newHerp)
  })
  .catch(next);
})

db.sync()
.then(() => {
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
})
.catch(console.error);
