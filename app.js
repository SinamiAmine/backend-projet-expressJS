const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')
const app = express()
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require('./models/user')
const PORT = process.env.PORT || 5000;
const {
    Projet,
    Maitre,
    Foncier,
    Directeur,
    Operation,
    Marche,
    Lot,
    Avancement,
    Count } = require('./models/model');
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb+srv://sinami:AmIne1996*@cluster0.o8a1w.mongodb.net/chaabi?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('réussie'))
    .catch(() => console.log('failed'))




const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "API PROJET POUR LE STAGE PFE",
            description: "Cette Documentation Presente L'API pour un projet réalisé par MR.Sinami Amin",
            contact: {
                name: "Sinami Amine"
            },
            servers: ["http://localhost:5000"]
        }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));





let projetController = {
    findByNom: async (req, res) => {
        let found = await Projet.findOne({ nomProjet: req.params.nomProjet }).populate('maitreOuvrage').populate('directeur').populate('foncier').exec()
        res.json(found);
    },
    findById: async (req, res) => {
        let found = await Projet.findOne({ idProjet: req.params.id })
            .populate('maitreOuvrage')
            .populate('directeur')
            .populate('foncier')
            .exec()
        res.json(found);
    },
    allProjet: async (req, res) => {
        let allProjets = await Projet.find()
            .populate('maitreOuvrage')
            .populate('directeur')
            .populate('foncier')
            .exec()
        res.json(allProjets)
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
}

let lotController = {
    insertMany: async (req, res) => {
        Lot.insertMany(req.body).then(() => {
            res.status(200).json({ message: "Success" })
        }).catch(err => {
            res.status(400).json({ err })
        });
    },
    findByDesignation: async (req, res) => {
        let found = await Lot.findOne({ designationLot: req.params.des })
        res.json(found);
    },
    findById: async (req, res) => {
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
}

//Maitre Controller

let maitreController = {

    findByCode: async (req, res) => {
        let found = await Maitre.find({ codeMaitreOuvrage: req.params.code })
        res.json(found);
    },

    updateMaitre: async (req, res) => {
        await Maitre.updateOne({ codeMaitreOuvrage: req.params.code }, { ...req.body, codeMaitreOuvrage: req.params.code })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
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

    findByRaison: async (req, res) => {
        let foundMaitre = await Maitre.find({ raisonSocial: req.params.raisonSocial })
        res.json(foundMaitre)
    },
    delete: async (req, res) => {
        await Maitre.deleteOne({ codeMaitreOuvrage: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
}



//Foncier Controller

let foncierController = {
    find: async (req, res) => {
        let found = await Foncier.find({ localite: req.params.localite })
        res.json(found);
    },

    all: async (req, res) => {
        let allFoncier = await Foncier.find()
        res.json(allFoncier)
    },

    create: async (req, res) => {
        let newFoncier = new Foncier(req.body);
        let savedFoncier = await newFoncier.save();
        res.json(savedFoncier);
    },

    findByCode: async (req, res) => {
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
}


//Directeur Controller

let directeurController = {

    findByMatricule: async (req, res) => {
        let found = await Directeur.find({ matricule: req.params.matricule })
        res.json(found);
    },
    findByCode: async (req, res) => {
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
    },
}


//Operation Controller

let operationController = {

    findByNom: async (req, res) => {
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

    findById: async (req, res) => {
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
}


//Marche Controller

let marcheController = {
    findById: async (req, res) => {
        let found = await Marche.find({ idMarche: req.params.id })
            .populate('operation').populate('lotMarche')
            .populate('directeur')
            .populate('maitreOuvrage')
            .exec()
        res.json(found);
    },

    updateMarche: async (req, res) => {
        await Marche.updateOne({ idMarche: req.params.id }, { ...req.body, idMarche: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    },
    allMarche: async (req, res) => {
        let allMarche = await Marche.find()
            .populate('operation').populate('lotMarche')
            .populate('directeur')
            .populate('maitreOuvrage')
            .exec()
        res.json(allMarche)
    },

    createMarche: async (req, res) => {
        let newMarche = new Marche(req.body);
        let savedMarche = await newMarche.save();
        res.json(savedMarche);
    },

    findByNum: async (req, res) => {
        let foundMarche = await Marche.find({ numMarche: req.params.num })
            .populate('operation').populate('lotMarche')
            .populate('directeur')
            .populate('maitreOuvrage')
            .exec()
        res.json(foundMarche)
    },
    deleteMarche: async (req, res) => {
        await Marche.deleteOne({ idMarche: req.params.id })
            .then(() => res.status(200).json({ message: "Objet Suprimmé" }))
            .catch(error => res.status(400).json({ error }))
    }
}



let countController = {

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

}


//Avancements Controller

let avancementController = {

    findByNum: async (req, res) => {
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
}


//Les Routes

/**
 * @swagger
 * /maitres:
 *  get:
 *    description: Use to request all maitre d'ouvrages
 *    summary: Get All Maitre d'ouvrages
 *    tags :
 *      - Maitres D'Ouvrages
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/maitres", maitreController.all)

/**
 * @swagger
 * /maitres/{code}:
 *  get:
 *    description: Use to request to  a specific maitre d'ouvrage By code maitre d'ouvrage
 *    summary: Get One Maitre D'ouvrage
  *    tags :
 *      - Maitres D'Ouvrages
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/maitres/:code", maitreController.findByCode)

/**
 * @swagger
 * /maitres/raisonsocial/{raisonSocial}:
 *  get:
 *    description: Use to request to  a specific maitre d'ouvrage
 *    summary: Get One Maitre D'ouvrage By raison social
  *    tags :
 *      - Maitres D'Ouvrages
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/maitres/raisonSocial/:raisonSocial", maitreController.findByRaison)

/**
 * @swagger
 * /maitres/newmaitre:
 *    post:
 *      summary: Create a new maitre d'ouvrages
 *      tags :
 *      - Maitres D'Ouvrages
 *    parameters:
 *      - name: maitre
 *        in: body
 *        description: the maitre d'ouvrage to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          raisonSocial:
 *             type:String
 *          telephone:
 *             type:String
 *          mobile:
 *              type:Number
 *          ville:
 *              type:String
 *          adresse:
 *              type:String
 *          email:
 *              type:String
 *    responses:
 *      '201':
 *        description: Successfully created maitre d'ouvrage
 */
app.post("/maitres/newmaitre", maitreController.create)

/**
 * @swagger
 * /maitres/d/:id:
 *  delete:
 *    summary: Delete maitre d'ouvrage by id
  *    tags :
 *      - Maitres D'Ouvrages
 *    description: Use to delete a specific maitre d'ouvrage by ID
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/maitres/d/:id", maitreController.delete)

/**
 * @swagger
 * /maitres/u/:codeMaitre:
 *  put:
 *    summary: Update Maitre d'ouvrage by ID
  *    tags :
 *      - Maitres D'Ouvrages
 *    description: Use to update an Maitre d'Ouvrage
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/maitres/u/:code", maitreController.updateMaitre)


/**
 * @swagger
 * /projets:
 *  get:
 *    description: Use to request all projets
 *    summary: Get All Projets
 *    tags : 
 *      - Projets
 *    responses:
 *      '200':
 *        description: A successful response
 * 
 */
app.post("/projets", projetController.allProjet)
app.get("/projets", projetController.allProjet)
/**
 * @swagger
 * /projets/{id}:
 *  get:
 *    description: Use to request to  a specific projet By ID
 *    summary: Get One Projet
 *    tags :
 *      - Projets
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/projets/:id", projetController.findById)


/**
 * @swagger
 * /projets/nomprjet/{nomProjet}:
 *  get:
 *    description: Use to request to  a specific projet By Nom Project
 *    summary: Get One Projet
 *    tags :
 *      - Projets
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/projets/nomprojet/:nomProjet", projetController.findByNom)

/**
 * @swagger
 * /projet/newprojet:
 *    post:
 *      summary: Create a new project
 *      tags :
 *        - Projets
 *    parameters:
 *      - name: projet
 *        in: body
 *        description: the project to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          nomProjet:
 *             type:String
 *          surfaceTitreFoncier:
 *             type:Number
 *          surfacePlancher:
 *              type:Number
 *          surfaceLoti:
 *              type:Number
 *          delai:
 *              type:Number
 *          budget:
 *              type:Number
 *          numAutorisationConstruire:
 *              type:Number
*          dateAutorisationConstruire:
 *              type:Date
 *          numAutorisationLotir:
 *              type:Number
 *          dateAutorisationLotir:
 *              type:Date
 *          observation:
 *              type:String
 *          maitreOuvrage:
 *              type:Number
 *          directeur:
 *              type:Number
 *          foncier:
 *              type:Number
 *    responses:
 *      '201':
 *        description: Successfully created projet
 */
app.post("/projets/newprojet", projetController.createProjet)

/**
 * @swagger
 * /projets/d/:id:
 *  delete:
 *    summary: Delete a specific project by ID
 *    tags :
 *      - Projets
 *    description: Use to delete an projet
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/projets/d/:id", projetController.deleteProjet)

/**
 * @swagger
 * /projets/u/:id:
 *  put:
 *    summary: Update Project by ID
 *    tags :
 *      - Projets
 *    description: Use to update an Project
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/projets/u/:id", projetController.updateProjet)


/**
 * @swagger
 * /fonciers:
 *  get:
 *    description: Use to request all fonciers
 *    summary: Get All Fonciers
 *    tags :
 *      - Fonciers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/fonciers", foncierController.all)

/**
 * @swagger
 * /fonciers/{codeFoncier}:
 *  get:
 *    description: Use to request to  a specific Foncier By code Foncier
 *    summary: Get One Foncier
 *    tags :
 *      - Fonciers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/fonciers/:codeFoncier", foncierController.findByCode)


/**
 * @swagger
 * /fonciers/newfoncier:
 *    post:
 *      summary: Create a new foncier
 *      tags :
 *        - Fonciers
 *    parameters:
 *      - name: foncier
 *        in: body
 *        description: the foncier to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          localite:
 *             type:String
 *          titrefoncier:
 *             type:String
 *          denomination:
 *              type:String
 *          etat:
 *              type:String
 *          latitude:
 *              type:Number
 *          longitude:
 *              type:Number
 *          observation:
 *              type:String
*          surfaceTf:
 *              type:Number
 *          niveauFoncier:
 *              type:Number
 *          ville:
 *              type:String
 *    responses:
 *      '201':
 *        description: Successfully created foncier
 */
app.post("/fonciers/newfoncier", foncierController.create)



/**
 * @swagger
 * /fonciers/d/:code:
 *  delete:
 *    summary: Delete a specific foncier by Code
 *    tags :
 *      - Fonciers
 *    description: Use to delete an foncier
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/fonciers/d/:code", foncierController.deleteFoncier)





/**
 * @swagger
 * /fonciers/u/:codeFoncier:
 *  put:
 *    summary: Update Maitre d'ouvrage by ID
  *    tags :
 *      - Fonciers
 *    description: Use to update an Foncier
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/fonciers/u/:code", foncierController.updateFoncier)





/**
 * @swagger
 * /directeurs:
 *  get:
 *    description: Use to request all directeurs
 *    summary: Get All Directeurs
 *    tags :
 *      - Directeurs
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post("/directeurs", directeurController.allDirecteurs)
app.get("/directeurs", directeurController.allDirecteurs)


/**
 * @swagger
 * /directeurs/{code}:
 *  get:
 *    description: Use to request to get a specific Directeur By Code Directeur
 *    summary: Get a specific Directeur By Code Directeur
 *    tags :
 *      - Directeurs
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/directeurs/:code", directeurController.findByCode)


/**
 * @swagger
 * /directeurs/matricule/{matricule}:
 *  get:
 *    description: Use to request to get a specific Directeur By Matricule Directeur
 *    summary: Get a specific Directeur By By Matricule Directeur
 *    tags :
 *      - Directeurs
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/directeurs/matricule/:matricule", directeurController.findByMatricule)


/**
 * @swagger
 * /directeurs/newdirecteur:
 *    post:
 *      summary: Create a new Directeur
 *      tags :
 *        - Directeurs
 *    parameters:
 *      - name: directeur
 *        in: body
 *        description: the directeur to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          matricule:
 *             type:Number
 *          nom:
 *             type:String
 *          prenom:
 *              type:String
 *          numCin:
 *              type:String
 *          codeFonction:
 *              type:Number
 *          telephone:
 *              type:Number
 *          email:
 *              type:String
 *          dateNaiss:
 *              type:Date
 *          dateEmbauche:
 *              type:Date
 *          prixParHeure:
 *              type:Number
 *          numCnss:
 *              type:String
 *    responses:
 *      '201':
 *        description: Successfully created Directeur
 */
app.post("/directeurs/newdirecteur", directeurController.createDirecteur)


/**
 * @swagger
 * /directeurs/d/{code}:
 *  delete:
 *    summary: Delete a specific directeur by ID
 *    tags :
 *      - Directeurs
 *    description: Use to delete an Directeur
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/directeurs/d/:code", directeurController.deleteDirecteur)


/**
 * @swagger
 * /directeurs/u/{code}:
 *  put:
 *    summary: Update a specific directeur by Code
 *    tags :
 *      - Directeurs
 *    description: Use to Update an Directeur By Code
 *    responses:
 *      '200':
 *        description: A successful Update
 */
app.put("/directeurs/u/:code", directeurController.updateDirecteur)









/**
 * @swagger
 * /marches:
 *  get:
 *    description: Use to request all Marches
 *    summary: Get All Marches
 *    tags :
 *      - Marches
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post("/marches", marcheController.allMarche)
app.get("/marches", marcheController.allMarche)



/**
 * @swagger
 * /marches/{idMarche}:
 *  get:
 *    description: Use to request to get a specific Marche By ID Marche
 *    summary: Get a specific Marche By ID Marche
 *    tags :
 *      - Marches
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/marches/:id", marcheController.findById)


/**
 * @swagger
 *  marches/nummarche/{numMarche}:
 *  get:
 *    description: Use to request to get a specific Marche By Num Marche
 *    summary: Get a specific Marche By Num Marche
 *    tags :
 *      - Marches
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/marches/nummarche/:num", marcheController.findByNum)


/**
 * @swagger
 * /Marches/newmarche:
 *    post:
 *      summary: Create a new Marche
 *      tags :
 *        - Marches
 *    parameters:
 *      - name: Marche
 *        in: body
 *        description: the Marche to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          numMarche:
 *             type:Number
 *          dateMarche:
 *             type:Date
 *          montantMarche:
 *              type:Number
 *          tauxRetenuGarantie:
 *              type:Number
 *          dejaPaye:
 *              type:Number
 *          dateDebutTravaux:
 *              type:Date
 *          dateFinTravaux:
 *              type:Number
 *          surfacePlancher:
 *              type:Number
 *          avancement:
 *              type:Number
 *          avancementAttache:
 *              type:Number
 *          seuilRetenueMarche:
 *              type:Number
 *          seuilPenaliteMarche:
 *              type:Number
 *          operation:
 *              type:Number
 *          lotMarche:
 *              type:Number
 *          directeur:
 *              type:Number
 *          maitreOuvrage:
 *              type:Number
 *    responses:
 *      '201':
 *        description: Successfully created Marche
 */
app.post("/marches/newmarche", marcheController.createMarche)


/**
 * @swagger
 * /Marches/d/{idMarche}:
 *  delete:
 *    summary: Delete a specific Marche by ID
 *    tags :
 *      - Marches
 *    description: Use to delete an Marche
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/marches/d/:id", marcheController.deleteMarche)


/**
 * @swagger
 * /marches/u/{idMarche}:
 *  put:
 *    summary: Update a specific Marche by Id Marche
 *    tags :
 *      - Marches
 *    description: Use to Update an Directeur By Id Marche
 *    responses:
 *      '200':
 *        description: A successful Update
 */
app.put("/marches/u/:id", marcheController.updateMarche)
































//Gestion Des Lots

/**
 * @swagger
 * /lots:
 *  get:
 *    description: Use to request all Lots
 *    summary: Get all Lots
 *    tags :
 *      - Lots
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post("/lots", lotController.allLots)
app.get("/lots", lotController.allLots)
app.get("/operations", operationController.allOperation)

/**
 * @swagger
 * /lots/{idLot}:
 *  get:
 *    description: Use to get a specific lot By ID
 *    summary: Get One lot
 *    tags :
 *      - Lots
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/lots/:id", lotController.findById)

/**
 * @swagger
 * /lots/designation/{designation}:
 *  get:
 *    description: Use to request to  a specific lot by Designation
 *    summary: Get One lot by designation
 *    tags :
 *      - Lots
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/lots/designation/:des", lotController.findByDesignation)

/**
 * @swagger
 * /Lots/newlot:
 *    post:
 *      summary: Create a new Lot
 *      tags :
 *        - Lots
 *    parameters:
 *      - name: Lot
 *        in: body
 *        description: the Lot to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          designation:
 *             type:String
 *    responses:
 *      '201':
 *        description: Successfully created Directeur
 */
app.post("/lots/newlot", lotController.createLot)

/**
 * @swagger
 * /lots/d/{{idLot}}:
 *  delete:
 *    summary: Delete Lot by Id Lot
 *    tags :
 *      - Lots
 *    description: Use to delete an Lot
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/lots/d/:id", lotController.deleteLot)


/**
 * @swagger
 * /lots/u/:id:
 *  put:
 *    summary: Update lot by ID
 *    tags :
 *      - Lots
 *    description: Use to update an lot
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/lots/u/:id", lotController.updateLot)

















/**
 * @swagger
 * /operations:
 *  get:
 *    description: Use to request all Operations
 *    summary: Get All Operations
 *    tags : 
 *      - Operations
 *    responses:
 *      '200':
 *        description: A successful response
 * 
 */
app.post("/operations", operationController.allOperation)
app.post("/count", countController.allCount)

/**
 * @swagger
 * /operations/{id}:
 *  get:
 *    description: Use to request to  a specific Operation By ID
 *    summary: Get One Operation
 *    tags :
 *      - Operations
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/operations/:id", operationController.findById)


/**
 * @swagger
 * /operations/nomoperation/{nomoperation}:
 *  get:
 *    description: Use to request to  a specific projet By Nom Operation
 *    summary: Get One Operation
 *    tags :
 *      - Operations
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/operations/nomoperation/:nom", operationController.findByNom)

/**
 * @swagger
 * /operation/newoperation:
 *    post:
 *      summary: Create a new Operation
 *      tags :
 *        - Operations
 *    parameters:
 *      - name: projet
 *        in: body
 *        description: the Operation to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          nomOperation:
 *             type:String
 *          surfaceTitreFoncier:
 *             type:Number
 *          surfacePlancher:
 *              type:Number
 *          surfaceLoti:
 *              type:Number
 *          delai:
 *              type:Number
 *          budget:
 *              type:Number
 *          numAutorisationConstruire:
 *              type:Number
*          dateAutorisationConstruire:
 *              type:Date
 *          numAutorisationLotir:
 *              type:Number
 *          dateAutorisationLotir:
 *              type:Date
 *          observation:
 *              type:String
 *          foncier:
 *              type:Number
 *          projet:
 *              type:Number
 *          directeur:
 *              type:Number
 *          maitreOuvrage:
 *              type:Number
 *    responses:
 *      '201':
 *        description: Successfully created Operation
 */
app.post("/operations/newoperation", operationController.createOperation)

/**
 * @swagger
 * /operations/d/:id:
 *  delete:
 *    summary: Delete a specific operation by ID
 *    tags :
 *      - Operations
 *    description: Use to delete an operation
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/operations/d/:id", operationController.deleteOperation)

/**
 * @swagger
 * /operations/u/:id:
 *  put:
 *    summary: Update Operation by ID
 *    tags :
 *      - Operations
 *    description: Use to update an Operation
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/operations/u/:id", operationController.updateOperation)









/**
 * @swagger
 * /avancements:
 *  get:
 *    description: Use to request all Avancements
 *    summary: Get All Avancements
 *    tags : 
 *      - Avancements
 *    responses:
 *      '200':
 *        description: A successful response
 * 
 */
app.get("/avancements", avancementController.allAvancement)

/**
 * @swagger
 * /avancements/{numAvancement}:
 *  get:
 *    description: Use to request to  a specific avancement By NUM
 *    summary: Get One Avancement
 *    tags :
 *      - Avancements
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/avancements/:num", avancementController.findByNum)



/**
 * @swagger
 * /avancements/newavancement:
 *    post:
 *      summary: Create a new Avancement
 *      tags :
 *        - Avancements
 *    parameters:
 *      - name: avancement
 *        in: body
 *        description: the Avancement to create
 *        required: false
 *        schema:
 *          type: object
 *          format: json
 *        properties:
 *          dateAvancement:
 *             type:Date
 *          tauxRealiseMarche:
 *             type:Number
 *          montantRealiseMarche:
 *              type:Number
 *          montantPrevuMarche:
 *              type:Number
 *          montantRealiseMarcheAncien:
 *              type:Number
 *          tauxRealiseMarcheAncien:
 *              type:Number
 *          retenueMalFaconMarche:
 *              type:Number
 *          marche:
 *              type:Marche
 *    responses:
 *      '201':
 *        description: Successfully created Avancement
 */
app.post("/avancements/newavancement", avancementController.createAvancement)

/**
 * @swagger
 * /avancements/d/:num:
 *  delete:
 *    summary: Delete a specific avancement by Num Avancement
 *    tags :
 *      - Avancements
 *    description: Use to delete an avancement
 *    responses:
 *      '200':
 *        description: A successful delete
 */
app.delete("/avancements/d/:num", avancementController.deleteAvancement)

/**
 * @swagger
 * /avancements/u/:numAvancement:
 *  put:
 *    summary: Update Operation by Num Avancement
 *    tags :
 *      - Avancements
 *    description: Use to update an Avancement
 *    responses:
 *      '200':
 *        description: A successful update
 */
app.put("/avancements/u/:num", avancementController.updateAvancement)


const paginatedProjets = require('./controllers/paginatedProjets')

app.get('/projet', paginatedProjets(Projet), (req, res) => {
    res.json(res.paginatedResults)
})


const paginatedOperations = require('./controllers/paginatedOperations')

app.get('/operation', paginatedOperations(Projet), (req, res) => {
    res.json(res.paginatedResults)
})





app.post('/signup', (req, res) => {
    const user = User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
        .then((err) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(user)
                res.json(user)
            }

        })

})

app.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) {
            console.log(err)
            res.json(err)
        } else {
            res.json(user)
        }
    })
})



app.listen(PORT)


