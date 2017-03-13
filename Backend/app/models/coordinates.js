// app/models/coordinates.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordinatesSchema = new Schema({
    coordinate1: Number,
    coordinate2: Number
});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);