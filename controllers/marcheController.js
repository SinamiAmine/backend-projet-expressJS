const Marche = require("../models/marche");

module.exports = {
  findByIdMarche: async (req, res) => {
    let found = await Marche.find({ idMarche: req.params.id })
      .populate("operation")
      .populate("lotMarche")
      .populate("directeur")
      .populate("maitreOuvrage")
      .exec();
    res.json(found);
  },

  updateMarche: async (req, res) => {
    await Marche.updateOne(
      { idMarche: req.params.id },
      { ...req.body, idMarche: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  },
  allMarche: async (req, res) => {
    let allMarche = await Marche.find()
      .populate("operation")
      .populate("lotMarche")
      .populate("directeur")
      .populate("maitreOuvrage")
      .exec();
    res.json(allMarche);
  },

  createMarche: async (req, res) => {
    let newMarche = new Marche(req.body);
    let savedMarche = await newMarche.save();
    res.json(savedMarche);
  },

  findByNumMarche: async (req, res) => {
    let foundMarche = await Marche.find({ numMarche: req.params.num })
      .populate("operation")
      .populate("lotMarche")
      .populate("directeur")
      .populate("maitreOuvrage")
      .exec();
    res.json(foundMarche);
  },
  deleteMarche: async (req, res) => {
    await Marche.deleteOne({ idMarche: req.params.id })
      .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
      .catch((error) => res.status(400).json({ error }));
  },
};
