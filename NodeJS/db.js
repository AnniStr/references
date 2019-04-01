/* Anni */

const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect('mongodb://localhost:27017/smokin-bbq', {useNewUrlParser: true}, (err) => {
    if (!err) {
        logger.log('info', 'MongoDB connection succeeded..');
    } else {
        logger.log('error', 'Error in DB connection : ' + JSON.stringify(err, undefined, 2));  //convert object 'err' into string
    }
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

require('./models/user.model');

var {Product} = require('./models/item');

module.exports = mongoose;

Product.findOne(function (err, result) {
    if (!result) {
        var products = [
            new Product({
                imagePath: "images/bbq2000.jpg",
                productID: 1,
                language: "en",
                name: "BBQ2000",
                description: "Smokin' BBQs BBQ 2000 gas BBQ guarantees a successful BBQ party with all your family and neighbours",
                price: 529,
                quantity: "",
                category: "grills"
            }),
            new Product({
                imagePath: "images/bbq2000.jpg",
                productID: 1,
                language: "de",
                name: "BBQ2000",
                description: "Der BBQ2000 Gasgrill von smokin' BBQ mit praktischem Deckelthermometer garantiert ein erfolgreiches BBQ erlebnis für die ganze Familie",
                price: 529,
                quantity: "",
                category: "grills"
            }),
            new Product({
                imagePath: "images/smoker-plus.jpg",
                productID: 2,
                language: "en",
                name: "Smoker plus",
                description: "smokin' BBQs smoker plus heats up fast and retains an even cooking temperature due to the reverse flow heat baffle. Be prepared for smokin' good steaks",
                price: 734,
                quantity: "",
                category: "smokers"
            }),
            new Product({
                imagePath: "images/smoker-plus.jpg",
                productID: 2,
                language: "de",
                name: "Smoker-Plus",
                description: "Der Smoker Plus von smokin' BBQ erhitzt schnell und hält gleichmäßige Temperaturen dank Rückströmungswärmeabschirmung.",
                quantity: "",
                price: 734,
                category: "smokers"
            }),
            new Product({
                imagePath: "images/garden-fire.jpeg",
                productID: 3,
                language: "en",
                name: "Garden Fireplace rustic",
                description: "smokin' BBQs Fireplace makes your garden a true rustic eye candy.",
                price: 159,
                quantity: "",
                category: "fireplaces"
            }),
            new Product({
                imagePath: "images/garden-fire.jpeg",
                productID: 3,
                language: "de",
                name: "Garten Kamin rustikal",
                description: "Der Garten Kamin von smokin' BBQ macht Ihren Garten zum rustikalen Schmuckstück.",
                price: 159,
                quantity: "",
                category: "fireplaces"
            }),
            new Product({
                imagePath: "images/garden-modern.jpg",
                productID: 4,
                language: "en",
                name: "Garden Fireplace modern",
                description: "smokin' BBQs Fireplace makes your garden a true modern eye candy",
                price: 159,
                quantity: "",
                category: "fireplaces"
            }),
            new Product({
                imagePath: "images/garden-modern.jpg",
                productID: 4,
                language: "de",
                name: "Garten Kamin modern",
                description: "Der Garten Kamin von smokin' BBQ macht Ihren Garten zum Schmuckstück, egal ob in schwarz oder weiß.",
                price: 159,
                quantity: "",
                category: "fireplaces"
            }),
            new Product({
                imagePath: "images/kugelgrill.jpeg",
                productID: 5,
                language: "en",
                name: "Charcoal Grill",
                description: "easy cleaning and optimal temperature - the smokin' BBQ charcoal grill is the reliable hero at your BBQ",
                price: 125,
                quantity: "",
                category: "grills"
            }),
            new Product({
                imagePath: "images/kugelgrill.jpeg",
                productID: 5,
                language: "de",
                name: "Holzkohle Grill",
                description: "Einfache Reinigung und optimale Temperatur - der Holzkohle Kugelgrill von smokin' BBQ ist Ihr zuverlässiger Grillheld ohne Schnikschnak.",
                price: 125,
                quantity: "",
                category: "grills"
            }),
            new Product({
                imagePath: "images/holzkohle.jpg",
                productID: 6,
                language: "en",
                name: "Charcoal",
                description: "Smokin' BBQs fast-heating charcoal makes BBQ easier - so safe your breath",
                quantity: "1 kg",
                category: "grills"
            }),
            new Product({
                imagePath: "images/holzkohle.jpg",
                productID: 6,
                language: "de",
                name: "Holzkohle",
                description: "Smokin' BBQs schnell-erhitzende HolzKohle macht das Grillen leichter - So sparen sie sich das pusten",
                price: 20,
                quantity: "1 kg",
                category: "grills"
            }),
        ];

        for (var i = 0; i < products.length; i++) {
            products[i].save(function (err, result) {
                if (err)
                    logger.log('error', 'Error in Retriving Products !!: ' + JSON.stringify(err, undefined, 2));
            });
        }
    }
});