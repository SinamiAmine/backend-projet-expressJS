const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let marcheSchema = new Schema({
    idMarche: { type: Number },
    numMarche: { type: String },
    dateMarche: { type: Date },
    montantMarche: { type: Number },
    tauxRetenuGarantie: { type: Number },
    dejaPaye: { type: Number },
    dateDebutTravaux: { type: Date },
    dateFinTravaux: { type: Date },
    surfacePlancher: { type: Number },
    avancement: { type: Number },
    avancementAttache: { type: Number },
    seuilRetenueMarche: { type: Number },
    seuilPenaliteMarche: { type: Number },
    operation: { type: Schema.Types.ObjectId, ref: "Operation" },
    lotMarche: [{ type: Schema.Types.ObjectId, ref: "Lot" }],
    directeur: { type: Schema.Types.ObjectId, ref: "Directeur" },
    maitreOuvrage: { type: Schema.Types.ObjectId, ref: "Maitre" },
})


var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

marcheSchema.plugin(autoIncrement.plugin, {
    model: "Marche", // collection or table name in which you want to apply auto increment
    field: "idMarche", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Marche", marcheSchema)