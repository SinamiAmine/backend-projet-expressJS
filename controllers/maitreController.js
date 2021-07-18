
const Maitre = require('../models/maitre')


module.exports = {
    findByCodeMaitre: async (req, res) => {
        let found = await Maitre.find({ codeMaitreOuvrage: req.params.code })
        res.json(found);
    },

    updateMaitre: async (req, res) => {
        await Maitre.updateOne({ codeMaitreOuvrage: req.params.code }, { ...req.body, codeMaitreOuvrage: req.params.code })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    },
    allMaitre: async (req, res) => {
        let allMaitre = await Maitre.find()
        res.json(allMaitre)
    },

    createMaitre: async (req, res) => {
        let newMaitre = new Maitre(req.body);
        let savedMaitre = await newMaitre.save();
        res.json(savedMaitre);
    },

    findByRaisonMaitre: async (req, res) => {
        let foundMaitre = await Maitre.find({ raisonSocial: req.params.raisonSocial })
        res.json(foundMaitre)
    },
    deleteMaitre: async (req, res) => {
        await Maitre.deleteOne({ codeMaitreOuvrage: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
};