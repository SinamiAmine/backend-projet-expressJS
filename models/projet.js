const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let projetSchema = new Schema({
    idProjet: { type: Number },
    nomProjet: { type: String },
    surfaceTitreFoncier: { type: Number },
    surfacePlancher: { type: Number },
    surfaceLoti: { type: Number },
    delai: { type: Number },
    budget: { type: Number },
    numAutorisationConstruire: { type: String },
    dateAutorisationConstruire: { type: Date },
    numAutorisationLotir: { type: String },
    dateAutorisationLotir: { type: Date },
    observation: { type: String },
    maitreOuvrage: { type: Schema.Types.ObjectId, ref: 'Maitre' },
    directeur: { type: Schema.Types.ObjectId, ref: 'Directeur' },
    foncier: { type: Schema.Types.ObjectId, ref: 'Foncier' }
})


var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

projetSchema.plugin(autoIncrement.plugin, {
    model: "Projet", // collection or table name in which you want to apply auto increment
    field: "idProjet", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


module.exports = mongoose.model("Projet", projetSchema)