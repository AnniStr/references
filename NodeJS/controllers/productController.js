// Anni
const express = require('express');

var logger = require('../logger');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/item'); // Speichert exportiertes Produkt aus dem Model

router.get('/', (req, res) => { // GET request 
  Product.find((err, docs) => {
    if (!err) {
      res.send(docs);
      logger.log('info', "HTTP Get Products:" + docs);
    }
    else {
      logger.log('error', 'Error in Retriving Products : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/:id', (req,res) => { // GET product mit 'id'
  if(!ObjectId.isValid(req.params.id)) // checked ob id existiert
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  
  Product.findById( req.params.id, (err,doc) => { // Product ist ein Mongoose Model und findById eine Funktion aus mongoose
    if (!err) {
      res.send(doc); 
      logger.log('info', "HTTP Get Products:" + doc);
    }
    else {
      logger.log('error', 'Error in Retriving Product :' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router; 