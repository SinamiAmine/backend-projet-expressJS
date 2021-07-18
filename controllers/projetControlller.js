
const Projet = require('../models/projet')


module.exports = {
    allProjets: async function (req, res) {
        let allProjets = await Projet.find()
            .populate('maitreOuvrage')
            .populate('directeur')
            .populate('foncier')

        res.json(allProjets)
    },
    findByIdProjet: async function (req, res) {
        let found = await Projet.findOne({ idProjet: req.params.id })
            .populate('maitreOuvrage')
            .populate('directeur')
            .populate('foncier')
        res.json(found);
    },
    findByNomProjet: async function (req, res) {
        let found = await Projet.findOne({ nomProjet: req.params.nomProjet }).populate('maitreOuvrage').populate('directeur').populate('foncier')
        res.json(found);
    },
    createProjet: async (req, res) => {
        let newProjet = new Projet(req.body);
        let savedProjet = await newProjet.save();
        res.send('sucess');
    },
    deleteProjet: async (req, res) => {
        await Projet.deleteOne({ idProjet: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    },
    updateProjet: async (req, res) => {
        await Projet.updateOne({ idProjet: req.params.id }, { ...req.body, idProjet: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
};