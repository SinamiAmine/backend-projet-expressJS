
const Count = require('../models/count')


module.exports = {
    allCount: async (req, res) => {
        let allCount = await Count.find()
        res.json(allCount)
    },

    createMarche: async (req, res) => {
        let newCount = new Count({
            nbProjet: Projet.countDocuments(),
            nbDirecteur: Directeur.countDocuments(),
            nbMarche: Marche.countDocuments(),
            nbLot: Lot.countDocuments()
        });
        let savedMarche = await newCount.save(newCount);
        res.json(savedMarche);
    },
};