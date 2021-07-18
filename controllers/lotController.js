const Lot = require('../models/lot')



module.exports = {
    findByDesignation: async (req, res) => {
        let found = await Lot.findOne({ designationLot: req.params.des })
        res.json(found);
    },
    findByIdLot: async (req, res) => {
        let found = await Lot.findOne({ idLot: req.params.id })
        res.json(found);
    },
    allLots: async (req, res) => {
        let allLot = await Lot.find()
        res.json(allLot)
    },
    createLot: async (req, res) => {
        let newLot = new Lot(req.body);
        let savedLot = await newLot.save();
        res.json(savedLot);
    },
    deleteLot: async (req, res) => {
        await Lot.deleteOne({ idLot: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    },
    updateLot: async (req, res) => {
        await Lot.updateOne({ idLot: req.params.id }, { ...req.body, idLot: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
};




