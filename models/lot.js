const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let lotsSchema = new Schema({
    idLot: { type: Number },
    designationLot: { type: String },
})

var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

lotsSchema.plugin(autoIncrement.plugin, {
    model: "Lot", // collection or table name in which you want to apply auto increment
    field: "idLot", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Lot", lotsSchema)