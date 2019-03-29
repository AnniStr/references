var expect = require('chai').expect;
var Product = require('../../models/item').Product;
var Item = require('../../models/item').Item;

describe('Produkt Schema', function() {
    
    it('should be invalid if Product ID is empty', function(done) {
        var product = new Product();

        product.validate(function(err) {
            expect(err.errors.productID).to.exist;
            done();
        });
    });

    it('should create a product', function(done) {
        var product = new Product(
            {
                imagePath: "images/smoker-plus.jpg",
                productID: 1,
                language: "en",
                name: "Smoker-Plus",
                description: "Englisch",
                price: 60,
                quantity: "10g",
                category: "smokers"
            }
        );

        product.validate(function() {
            expect(product).to.exist;
            done();
        });
    });
});

describe('Item Schema', function() {
    
  it('should create a item', function(done) {
    var productItem = new Product(
      {
        imagePath: "images/bbq2000.jpg",
        productID: 1,
        language: "en",
        name: "BBQ 2000",
        description: "Englisch",
        price: 60,
        quantity: "10g",
        category: "grills"
      }
    );

    var item = new Item(
      {
        numOf: 3,
        userEmail: 'test@MediaList.com',
        product: productItem
      }
    );

    item.validate(function() {
      expect(item).to.exist;
      done();
    });
  });

  it('should not create a item when product is empty/undefined', function(done) {
    var productItem = new Product({});
    var item = new Item(
      {
        numOf: 3,
        userEmail: 'test@MediaList.com',
        product: productItem
      }
    );

    item.validate(function(err) {
      expect(err.errors.productItem).is.undefined;
      done();
    });
  });
});

