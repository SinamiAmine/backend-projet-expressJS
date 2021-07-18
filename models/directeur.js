const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let directeurSchema = new Schema({
    code: { type: Number },
    matricule: { type: Number },
    nom: { type: String },
    prenom: { type: String },
    numCin: { type: String },
    telephone: { type: String },
    email: { type: String },
    dateNaiss: { type: Date },
    dateEmbauche: { type: Date },
    prixParHeure: { type: Number },
    numCnss: { type: Number },
})


var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

directeurSchema.plugin(autoIncrement.plugin, {
    model: "Directeur", // collection or table name in which you want to apply auto increment
    field: "code", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Directeur", directeurSchema)