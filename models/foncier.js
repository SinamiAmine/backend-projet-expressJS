const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let foncierSchema = new Schema({
    codeFoncier: { type: Number },
    localite: { type: String },
    titreFoncier: { type: String },
    denomination: { type: String },
    etat: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    observation: { type: String },
    surfaceTf: { type: Number },
    ville: { type: String },
})

var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

foncierSchema.plugin(autoIncrement.plugin, {
    model: "Foncier", // collection or table name in which you want to apply auto increment
    field: "codeFoncier", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Foncier", foncierSchema)