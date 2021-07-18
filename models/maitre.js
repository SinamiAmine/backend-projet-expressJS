const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let maitreOuvrageSchema = new Schema({
    codeMaitreOuvrage: { type: Number },
    raisonSocial: { type: String },
    telephone: { type: String },
    mobile: { type: String },
    ville: { type: String },
    adresse: { type: String },
    email: { type: String },

})

var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

maitreOuvrageSchema.plugin(autoIncrement.plugin, {
    model: "Maitre", // collection or table name in which you want to apply auto increment
    field: "codeMaitreOuvrage", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Maitre", maitreOuvrageSchema)