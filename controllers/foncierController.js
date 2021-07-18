
const Foncier = require('../models/foncier')


module.exports = {
    findByLocalite: async (req, res) => {
        let found = await Foncier.find({ localite: req.params.localite })
        res.json(found);
    },

    allFoncier: async (req, res) => {
        let allFoncier = await Foncier.find()
        res.json(allFoncier)
    },

    createFoncier: async (req, res) => {
        let newFoncier = new Foncier(req.body);
        let savedFoncier = await newFoncier.save();
        res.json(savedFoncier);
    },

    findByCodeFoncier: async (req, res) => {
        let foundFoncier = await Foncier.find({ codeFoncier: req.params.codeFoncier })
        res.json(foundFoncier)
    },
    updateFoncier: async (req, res) => {
        await Foncier.updateOne({ codeFoncier: req.params.code }, { ...req.body, codeFoncier: req.params.code })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    },

    deleteFoncier: async (req, res) => {
        await Foncier.deleteOne({ codeFoncier: req.params.code })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
};