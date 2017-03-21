// app/models/coordinates.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Attributes which will be saved in the mongoDB
var CoordinatesSchema = new Schema({
    coordinate1: Number,
    coordinate2: Number,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    x1y1: String,
    x2y2: String

});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);