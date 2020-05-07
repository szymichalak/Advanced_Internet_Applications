const express=require('express');
const session=require('express-session');
const path=require('path');
const parser=require('body-parser');
const ejs=require('ejs');

const routing=require('./routing');
const app=express();

app.set('view engine','ejs');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: false}));
app.use(parser.json());      
app.use(parser.urlencoded({extended: true}));

app.use('/',routing);
app.use( express.static( "public" ) );

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}: ${new Date()}`)
    next();
})


// mongoose.connect(url, {poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true});

// database init
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/', {poolSize: 10}, function (err, client) {
    if (err) throw err

    var db = client.db('store')
    db.collection('cars').countDocuments().then((num)=>{
        if(num===0){
            console.log("Database has been created!")
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
        }
    })
    client.close();
})

app.listen(3000,()=>{
    console.log("Server is running...");
});
