
const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')

//Table => Maitres Ouvrages

let maitreOuvrageSchema = new Schema({
    codeMaitreOuvrage: { type: Number },
    raisonSocial: { type: String },
    telephone: { type: String },
    mobile: { type: String },
    ville: { type: String },
    adresse: { type: String },
    email: { type: String },

})

//Table => Fonciers

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


//Table => Projets

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

//Table => Directeur

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

let countSchema = new Schema({
    nbProjet: { type: Number },
    nbDirecteur: { type: Number },
    nbMarche: { type: Number },
    nbLot: { type: Number },
})

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

let lotsSchema = new Schema({
    idLot: { type: Number },
    designationLot: { type: String },
})

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

maitreOuvrageSchema.plugin(autoIncrement.plugin, {
    model: "Maitre", // collection or table name in which you want to apply auto increment
    field: "codeMaitreOuvrage", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

projetSchema.plugin(autoIncrement.plugin, {
    model: "Projet", // collection or table name in which you want to apply auto increment
    field: "idProjet", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


foncierSchema.plugin(autoIncrement.plugin, {
    model: "Foncier", // collection or table name in which you want to apply auto increment
    field: "codeFoncier", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

opeationSchema.plugin(autoIncrement.plugin, {
    model: "Operation", // collection or table name in which you want to apply auto increment
    field: "idOperation", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

marcheSchema.plugin(autoIncrement.plugin, {
    model: "Marche", // collection or table name in which you want to apply auto increment
    field: "idMarche", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

avancementSchema.plugin(autoIncrement.plugin, {
    model: "Avancement", // collection or table name in which you want to apply auto increment
    field: "numAvancement", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

lotsSchema.plugin(autoIncrement.plugin, {
    model: "Lot", // collection or table name in which you want to apply auto increment
    field: "idLot", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

directeurSchema.plugin(autoIncrement.plugin, {
    model: "Directeur", // collection or table name in which you want to apply auto increment
    field: "code", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Création Des Models
const Projet = mongoose.model('Projet', projetSchema);
const Maitre = mongoose.model('Maitre', maitreOuvrageSchema);
const Foncier = mongoose.model('Foncier', foncierSchema);
const Count = mongoose.model('Count', countSchema);
const Directeur = mongoose.model('Directeur', directeurSchema);
const Operation = mongoose.model('Operation', opeationSchema);
const Marche = mongoose.model('Marche', marcheSchema);
const Lot = mongoose.model('Lot', lotsSchema);
const Avancement = mongoose.model('Avancement', avancementSchema);

module.exports = { Projet, Maitre, Foncier, Directeur, Operation, Marche, Lot, Avancement, Count }
