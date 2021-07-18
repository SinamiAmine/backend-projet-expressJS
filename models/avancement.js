const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

let avancementSchema = new Schema({
    numAvancement: { type: Number },
    dateAvancement: { type: Date },
    tauxRealiseMarche: { type: Number },
    montantRealiseMarche: { type: Number },
    montantPrevuMarche: { type: Number },
    montantRealiseMarcheAncien: { type: Number },
    tauxRealiseMarcheAncien: { type: Number },
    retenueMalFaconMarche: { type: Number },
    marche: { type: Schema.Types.ObjectId, ref: "Marche" },

})


var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

avancementSchema.plugin(autoIncrement.plugin, {
    model: "Avancement", // collection or table name in which you want to apply auto increment
    field: "numAvancement", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.model("Avancement", avancementSchema)