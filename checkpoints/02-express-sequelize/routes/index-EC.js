var express = require('express');
var router = express.Router();
var Article = require('../models/article');

// GET all articles
router.get('/articles', function(req, res, next){
  Article.findAll()
  .then(function(foundArticles){
    res.json(foundArticles);
  })
  .catch(next)
});

// POST any new article
router.post('/articles', function(req, res, next){
  Article.create(req.body)
  .then(function(article){
    var response = {
      message: 'Created successfully',
      article
    }
    res.json(response);
  })
  .catch(next)
});

// ID based routes below

// APP.PARAMS: check it out in Express documentation
// I find the article by ID and do error handling in this method
// so I will not have to repeat this work in my other routes!

// line 43, I am placing the found Sequelize instance as a prop on the req object
// line 44, I call next(): the http request will continue down the pipeline
// to its final destination

router.param('id', function(req, res, next, id){
  Article.findById(id)
  .then(function(foundArticle){
    if (!foundArticle){
      res.sendStatus(404);
    }
    req.articleById = foundArticle;
    next();
  })
  .catch(next)
});

// Now, these GET and PUT routes already have access
// to the Sequelize instances off of the request!

router.get('/articles/:id', function(req, res, next){
  res.json(req.articleById)
});

// req.articleById is literally just the Sequelize instance with the right ID,
// meaning I can use methods like .update or .destroy

router.put('/articles/:id', function(req, res, next){
  req.articleById.update(req.body, { returning: true })
  .then(function(article){
    const response= {
      message: 'Updated successfully',
      article
    }
    res.json(response)
  })
  .catch(next)
});

module.exports = router;
