const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID;

var bought = [];
var not_available = [];
var order_made = false;
var car_added = false;

router.get('/', (req, res) => {
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', {poolSize: 10}, function (err, client) {
        if (err) throw err

        var db = client.db('store')

        db.collection('cars').find().toArray(function (err, result) {
            if (err) throw err

            var information = ""
            if (car_added){
                car_added = false;
                information = "Selected car has been added to your cart!"
            }

            if (order_made){
                if(not_available.length != 0){
                    for(var i =0;i<not_available.length; i++){
                        var car = not_available[i].mark + ' ' + not_available[i].model + ' is no longer available - ';
                        information += car
                        // console.log(not_available[i]);
                    }
                    if(bought.length != 0){
                        information += 'The rest of cars are yours'
                    }
                    
                    order_made = false;
                    not_available = [];
                }
                else{
                    information = "All cars from cart were bought"
                    order_made = false;
                    bought = [];
                }
            }


            res.render('main', { 'cars': result, 'info': information })

        })
        client.close()
    })

});

router.post('/add_to_cart', (req, res) => {
    var car = {
        _id: req.body.carID,
        mark: req.body.carMark,
        model: req.body.carModel,
        production_year: req.body.carYear,
        engine_power: req.body.carEngine
    }

    if (!req.session.cart) {
        req.session.cart = []
    }

    var present = false;

    for (var i = 0; i < req.session.cart.length; i++) {
        if (car._id == req.session.cart[i]._id) {
            present = true;
            break;
        }
    }
    if (!present) {
        req.session.cart.push(car);
        car_added = true;
        res.redirect('/')
    }
    else {
        res.redirect('/')
    }
});

router.get('/cart', (req, res) => {
    res.render('cart', { 'cars': req.session.cart })
});

router.get('/cancel_all', (req, res) => {
    req.session.cart = []
    res.redirect('/')
});

router.post('/remove_from_cart', (req, res) => {
    var car = {
        _id: req.body.carID,
        mark: req.body.carMark,
        model: req.body.carModel,
        production_year: req.body.carYear,
        engine_power: req.body.carEngine
    }

    for (var i = 0; i < req.session.cart.length; i++) {
        if (car._id == req.session.cart[i]._id) {
            req.session.cart.splice(i, 1)
            break;
        }
    }

    res.redirect('cart')
});

router.get('/purchase_all', (req, res) => {

    if (!req.session.cart) {
        req.session.cart = []
    }

    var cart_length = req.session.cart.length;
    if (cart_length === 0){
        res.redirect('/cart');
    }

    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', {poolSize: 10}, function (err, client) {
        if (err) throw err

        var db = client.db('store')

        req.session.cart.forEach(element => { 

            db.collection("cars").deleteOne({_id:ObjectId(element._id)}, function(err, obj) {
                if (err) throw err;

                if (obj.result.n === 1){
                    bought.push(element)
                }
                else if (obj.result.n === 0){
                    not_available.push(element)
                }

            });
            
        });
        
        order_made = true;
        client.close()
        req.session.cart = []
        res.redirect('/')
    })


});

router.get('/restart', (req, res) => {
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', {poolSize: 10}, function (err, client) {
        if (err) throw err

        var db = client.db('store')

        db.collection('cars').insertMany([
            {
                mark: 'Ford',
                model: 'Focus',
                production_year: '2005',
                engine_power: '150PS'
            },
            {
                mark: 'Mercedes',
                model: 'A169',
                production_year: '2012',
                engine_power: '112PS'
            },
            {
                mark: 'BMW',
                model: 'E46',
                production_year: '2009',
                engine_power: '173PS'
            },
            {
                mark: 'VW',
                model: 'Golf',
                production_year: '2015',
                engine_power: '103PS'
            }
        ])  
        client.close()
    })
    res.redirect('/')
})


module.exports = router;

