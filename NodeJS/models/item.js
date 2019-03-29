// Anni
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductSchema = new Schema({ 
  imagePath: { type: String, default: '' },
  productID: { type: Number, default: undefined, required: true },
  language: { type: String, default: '' },
  name: { type: String, default: ''},
  description: { type: String, default: '' },
  price: { type: Number, default: undefined },
  quantity: { type: String, default: '' },
  category: { type: String, default: '' }    
});

var Product = mongoose.model('Product', ProductSchema);

var ItemSchema = new Schema({ 
  numOf: { type: Number, default: 0 },
  userEmail: { type: String, default: '' },
  product: ProductSchema
});

var Item = mongoose.model('Item', ItemSchema);

module.exports =  ({Product, Item});