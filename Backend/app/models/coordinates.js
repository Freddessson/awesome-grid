// app/models/coordinates.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordinatesSchema = new Schema({
    coordinate1: Number,
    coordinate2: Number,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number
});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);