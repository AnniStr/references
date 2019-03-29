// Anni
const express = require('express');

var logger = require('../logger');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Item } = require('../models/item');

router.get('/:userEmail', (req, res) => { // GET request    
  Item.find( {userEmail: req.params.userEmail} , (err,doc) => { 
    if (!err) {
      res.send(doc); 
      logger.log('info', "HTTP Get Cart:" + doc);
    }
    else {
      logger.log('error', 'Error in Retriving Cart :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/', (req, res) => {    
  Item.findOne({userEmail:req.body.userEmail, 'product.productID':req.body.product.productID},(err, doc) => {
    if(!err) {
      if (doc !== null) {
        var newNumOf = req.body.numOf + doc.numOf;
        Item.updateOne({_id: doc._id}, {'numOf': newNumOf}, (err, doc) => {
          if(!err)
            logger.log('info', "HTTP Post Cart update numOf:" + doc);
          else
            logger.log('error', 'Error trying to update addItem: ' + JSON.stringify(err, undefined, 2));
        });
      } else {        
        var prod = new Item({ // aus Usereingaben (request body Object)
          numOf: req.body.numOf,
          userEmail: req.body.userEmail,
          product: req.body.product 
        });
        prod.save((err, doc) => {
          if (!err) 
            res.send(doc);
          else
            logger.log('error', 'Error in Item Save: ' + JSON.stringify(err, undefined, 2)); 
        });
      }
    } else {
      logger.log('error', 'Error in finding Items in /items Post : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/', (req, res) => {
  Item.find((err, docs) => {
    if (!err) {
      res.send(docs);
      logger.log('info', "HTTP Get Items:" + docs);
    }
    else {
      logger.log('error', 'Error in Retriving Items : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.delete('/:userEmail/:productID', (req,res) => { // DELETE Workout mit 'id'(übergeben als Parameter)
  Item.deleteMany( { userEmail: req.params.userEmail, 'product.productID': req.params.productID }, (err,doc) => { // Workout ist ein Mongoose Model und findByIdAndRemove eine Funktion aus mongoose
    if (!err)
      res.send(doc); 
    else
      logger.log('error', 'Error in Deleting Item: ' + JSON.stringify(err, undefined, 2));
  });
});

router.get('/:userEmail/:productID', (req,res) => { // DELETE Workout mit 'id'(übergeben als Parameter)
  Item.find( { userEmail: req.params.userEmail, 'product.productID': req.params.productID }, (err,docs) => {
    if (!err) {
      res.send(docs);
      logger.log('info', "HTTP Get Items:" + docs);
    }
    else {
      logger.log('error', 'Error in Retriving Items : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/:userEmail/:productID', (req,res) => { // DELETE Workout mit 'id'(übergeben als Parameter)
  Item.findOneAndUpdate( { userEmail: req.params.userEmail, 'product.productID': req.params.productID }, {numOf: req.body.numOf}, (err,docs) => {
    if (!err) {
      res.send(docs);
      logger.log('info', "HTTP Get Items:" + docs);
    }
    else {
      logger.log('error', 'Error in Retriving Items : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router; 