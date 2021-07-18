
const Operation = require('../models/operation')


module.exports = {
    findByNomOperation: async (req, res) => {
        let found = await Operation.find({ nomOperation: req.params.nom })
            .populate('foncier').populate('projet')
            .populate('directeur')
            .populate('maitreOuvrage')
            .exec()
        res.json(found);
    },

    updateOperation: async (req, res) => {
        await Operation.updateOne({ idOperation: req.params.id }, { ...req.body, idOperation: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    },
    allOperation: async (req, res) => {
        let allOperation = await Operation.find().populate('foncier').populate('projet').populate('directeur').populate('maitreOuvrage').exec()
        res.json(allOperation)
    },

    createOperation: async (req, res) => {
        let newOperation = new Operation(req.body);
        let savedOperation = await newOperation.save();
        res.json(savedOperation);
    },

    findByIdOperation: async (req, res) => {
        let foundOperation = await Operation.find({ idOperation: req.params.id })
            .populate('foncier')
            .populate('projet')
            .populate('directeur')
            .populate('maitreOuvrage')
            .exec()
        res.json(foundOperation)
    },
    deleteOperation: async (req, res) => {
        await Operation.deleteOne({ idOperation: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
};