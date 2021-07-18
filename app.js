const mongoose = require('mongoose');
const { model, Schema } = require('mongoose')
const express = require('express')
const app = express()
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require('./models/user')
const PORT = process.env.PORT || 5000;
var jwt = require('jsonwebtoken')
const Projet = require('./models/projet')
const Operation = require('./models/operation')
const Lot = require('./models/lot')
const Avancement = require('./models/avancement')
const Marche = require('./models/marche')
const Foncier = require('./models/foncier')
const Count = require('./models/count')
const Maitre = require('./models/maitre')
const Directeur = require('./models/directeur')
const { allProjets, findByIdProjet, createProjet, deleteProjet, updateProjet, findByNomProjet } = require('./controllers/projetControlller');
const { findByNumAv, updateAvancement, allAvancement, createAvancement, deleteAvancement } = require('./controllers/avancementController');
const { findByIdMarche, updateMarche, allMarche, createMarche, findByNumMarche, deleteMarche } = require('./controllers/marcheController');
const { findByMatricule, findByCodeDirecteur, allDirecteurs, createDirecteur, deleteDirecteur, updateDirecteur } = require('./controllers/directeurController');
const { findByLocalite, allFoncier, createFoncier, findByCodeFoncier, updateFoncier, deleteFoncier } = require('./controllers/foncierController');
const { findByDesignation, findByIdLot, allLots, createLot, deleteLot, updateLot } = require('./controllers/lotController');
const { findByCodeMaitre, updateMaitre, allMaitre, createMaitre, findByRaisonMaitre, deleteMaitre } = require('./controllers/maitreController');
const { findByNomOperation, updateOperation, allOperation, createOperation, findByIdOperation, deleteOperation } = require('./controllers/operationController');



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
app.get("/maitres", allMaitre)

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
app.get("/maitres/:code", findByCodeMaitre)

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
app.get("/maitres/raisonSocial/:raisonSocial", findByRaisonMaitre)

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
app.post("/maitres/newmaitre", createMaitre)

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
app.delete("/maitres/d/:id", deleteMaitre)

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
app.put("/maitres/u/:code", updateMaitre)


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

app.get('/projets', allProjets);
app.post('/projets', allProjets);

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
app.get("/projets/:id", findByIdProjet)


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
app.get("/projets/nomprojet/:nomProjet", findByNomProjet)

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
app.post("/projets/newprojet", createProjet)

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
app.delete("/projets/d/:id", deleteProjet)

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
app.put("/projets/u/:id", updateProjet)


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
app.get("/fonciers", allFoncier)

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
app.get("/fonciers/:codeFoncier", findByCodeFoncier)


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
app.post("/fonciers/newfoncier", createFoncier)



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
app.delete("/fonciers/d/:code", deleteFoncier)





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
app.put("/fonciers/u/:code", updateFoncier)





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
app.post("/directeurs", allDirecteurs)
app.get("/directeurs", allDirecteurs)


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
app.get("/directeurs/:code", findByCodeDirecteur)


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
app.get("/directeurs/matricule/:matricule", findByMatricule)


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
app.post("/directeurs/newdirecteur", createDirecteur)


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
app.delete("/directeurs/d/:code", deleteDirecteur)


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
app.put("/directeurs/u/:code", updateDirecteur)









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
app.post("/marches", allMarche)
app.get("/marches", allMarche)



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
app.get("/marches/:id", findByIdMarche)


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
app.get("/marches/nummarche/:num", findByNumMarche)


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
app.post("/marches/newmarche", createMarche)


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
app.delete("/marches/d/:id", deleteMarche)


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
app.put("/marches/u/:id", updateMarche)
































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
app.post("/lots", allLots)
app.get("/lots", allLots)
app.get("/operations", allOperation)

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
app.get("/lots/:id", findByIdLot)

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
app.get("/lots/designation/:des", findByDesignation)

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
app.post("/lots/newlot", createLot)

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
app.delete("/lots/d/:id", deleteLot)


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
app.put("/lots/u/:id", updateLot)

















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
app.post("/operations", allOperation)
// app.post("/count", countController.allCount)

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
app.get("/operations/:id", findByIdOperation)


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
app.get("/operations/nomoperation/:nom", findByNomOperation)

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
app.post("/operations/newoperation", createOperation)

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
app.delete("/operations/d/:id", deleteOperation)

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
app.put("/operations/u/:id", updateOperation)









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
app.get("/avancements", allAvancement)

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
app.get("/avancements/:num", findByNumAv)



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
app.post("/avancements/newavancement", createAvancement)

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
app.delete("/avancements/d/:num", deleteAvancement)

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
app.put("/avancements/u/:num", updateAvancement)





const paginatedMarches = require('./controllers/marcheControllerPaginated')

app.get('/marche', paginatedMarches(Marche), (req, res) => {
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

app.post('/login', function (req, res) {
    const user = { id: 3 };
    const token = jwt.sign({ user }, "my secret");
    res.json({
        token: token
    });
})

app.listen(PORT)


