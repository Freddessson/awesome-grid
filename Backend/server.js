// server.js
//Start application: nodemon server.js
// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/t37'); // connect to our database

var cors = require('cors')

// models
var Coordinates = require('./app/models/coordinates');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 3500;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

// on routes that end in /coordinate
// ----------------------------------------------------
router.route('/coordinates')

    // create a coordinate (accessed at POST http://localhost:3500/api/coordinates)
    .post(function (req, res) {

        var coordinates = new Coordinates();      // create a new instance of the Coordinates model

        coordinates.coordinate1 = req.body.coordinate1;
                    console.log(req.body.coordinate1 + "c1")//ddddddddddddddddddddddddddddd

        coordinates.coordinate2 = req.body.coordinate2;

        /*coordinates.coordinate3 = req.body.coordinate1;
        coordinates.coordinate4 = req.body.coordinate2;*/

        // save the coordinates and check for errors
        coordinates.save({}, function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Coordinates was created!' });

        });

    });

// get all the coordinates (accessed at GET http://localhost:3500/api/coordinates)
//router.route('/coordinates')
router.route('/coordinates')
    .get(function (req, res) {

        Coordinates.find({}, function (err, coordinates) {
            console.log("Trying to get coordinates")
            if (err)
                res.send(err);

            res.json(coordinates);
        });
    });

// get coordinates by id (accessed at GET http://localhost:3500/api/coordinates/coordinateID)
//router.route('/coordinates')
router.route('/coordinates/:coordinates_id')
    .get(function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");

        Coordinates.findById(req.params.coordinates_id, function (err, coordinates) {
            console.log("[get]Trying to get coordinates")
            if (err)
                res.send(err);

            res.json(coordinates);
        });
    });

    
//update coordinates by id using PUT http://localhost:3500/api/coordinates/coordinateID 
router.route('/coordinates/:coordinates_id')
    .put(function (req, res) {
        Coordinates.findById(req.params.coordinates_id, function (err, coordinates) {
            console.log("[put]Trying to update coordinates")
            if (err)
                res.send(err);
            coordinates.coordinate1 = req.body.coordinate1;
            coordinates.coordinate2 = req.body.coordinate2;
            // save the coordinate
            coordinates.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Coordinates updated with: ' + coordinates.coordinate1 + " and " + coordinates.coordinate2 });
            });
        });
    });

//Delete coordinates by id using REMOVE http://localhost:3500/api/coordinates/coordinateID  
router.route('/coordinates/:coordinates_id')
    .delete(function (req, res) {
        var coordinates = new Coordinates();
        Coordinates.findById(req.params.coordinates_id, function (err, coordinates) {
            console.log("[Delete] coordinates")
            // re,pve the coordinate
            coordinates.remove({
                _id: req.params.coordinates_id
            }, function (err, coordinates) {
                if (err) {
                    res.send(err)
                }
                res.json({ message: 'Coordinates deleted: ' + coordinates.coordinate1 + " and " + coordinates.coordinate2 });
            });
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);