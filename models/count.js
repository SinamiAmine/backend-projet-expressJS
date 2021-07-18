const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let countSchema = new Schema({
    nbProjet: { type: Number },
    nbDirecteur: { type: Number },
    nbMarche: { type: Number },
    nbLot: { type: Number },
})


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


module.exports = mongoose.model("Count", countSchema)