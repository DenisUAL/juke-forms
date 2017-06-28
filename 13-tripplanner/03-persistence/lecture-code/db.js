const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/nerdyherps');

db.define('herps_for_sale', {
  name: {
    type: Sequelize.STRING,
    validate: {notEmpty: true}
  },
  species: Sequelize.STRING,
  price: Sequelize.FLOAT,
  age: Sequelize.INTEGER,
  picture_url: Sequelize.STRING,
})

module.exports = db;
