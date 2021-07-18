const Avancement = require('../models/avancement')


module.exports = {
    findByNumAv: async (req, res) => {
        let found = await Avancement.find({ numAvancement: req.params.num })
            .populate('marche')
            .exec()
        res.json(found);
    },

    updateAvancement: async (req, res) => {
        await Avancement.updateOne({ numAvancement: req.params.num }, { ...req.body, numAvancement: req.params.num })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    },
    allAvancement: async (req, res) => {
        let allAvancement = await Avancement.find()
            .populate('marche')
            .exec()
        res.json(allAvancement)
    },

    createAvancement: async (req, res) => {
        let newAvancement = new Avancement(req.body);
        let savedAvancement = await newAvancement.save();
        res.json(savedAvancement);
    },

    deleteAvancement: async (req, res) => {
        await Avancement.deleteOne({ numAvancement: req.params.num })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
};