const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')

const { Maitre } = require('../models/model')


let maitreController = {

    find: async (req, res) => {
        let found = await Maitre.find({ raisonSocial: req.params.raisonSocial })
        res.json(found);
    },

    all: async (req, res) => {
        let allMaitre = await Maitre.find()
        res.json(allMaitre)
    },

    create: async (req, res) => {
        let newMaitre = new Maitre(req.body);
        let savedMaitre = await newMaitre.save();
        res.json(savedMaitre);
    },

    getAllMaitre: async (req, res) => {
        let foundMaitre = await Maitre.find({ raisonSocial: req.params.raisonSocial })
        res.json(foundMaitre)
    }
}


module.exports = { maitreController }