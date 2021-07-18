
const Directeur = require('../models/directeur')


module.exports = {
    findByMatricule: async (req, res) => {
        let found = await Directeur.find({ matricule: req.params.matricule })
        res.json(found);
    },
    findByCodeDirecteur: async (req, res) => {
        let found = await Directeur.find({ code: req.params.code })
        res.json(found);
    },

    allDirecteurs: async (req, res) => {
        let allDirecteur = await Directeur.find()
        res.json(allDirecteur)
    },

    createDirecteur: async (req, res) => {
        let newDirecteur = new Directeur(req.body);
        let savedDirecteur = await newDirecteur.save();
        res.json(savedDirecteur);
    },

    deleteDirecteur: async (req, res) => {
        await Directeur.deleteOne({ code: req.params.code })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    },
    updateDirecteur: async (req, res) => {
        await Directeur.updateOne({ code: req.params.code }, { ...req.body, code: req.params.code })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
};