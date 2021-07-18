const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let opeationSchema = new Schema({
    idOperation: { type: Number },
    nomOperation: { type: String },
    surfaceTitreFoncier: { type: Number },
    surfacePlancher: { type: Number },
    surfaceLoti: { type: Number },
    delai: { type: Number },
    budget: { type: Number },
    numAutorisationConstruire: { type: String },
    dateAutorisationConstruire: { type: Date },
    numAutorisationLotir: { type: String },
    dateAutorisationLotir: { type: Date },
    foncier: { type: Schema.Types.ObjectId, ref: "Foncier" },
    projet: { type: Schema.Types.ObjectId, ref: "Projet" },
    directeur: { type: Schema.Types.ObjectId, ref: "Directeur" },
    maitreOuvrage: { type: Schema.Types.ObjectId, ref: "Maitre" },

})


var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

opeationSchema.plugin(autoIncrement.plugin, {
    model: "Operation", // collection or table name in which you want to apply auto increment
    field: "idOperation", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Operation", opeationSchema)