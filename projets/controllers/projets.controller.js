const ProjetModel = require('../models/projets.model');

exports.insert = (req, res) => {
    ProjetModel.createProjet(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProjetModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        })
};


exports.getById = (req, res) => {
    ProjetModel.findById(req.params.ProjetId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.getByUserId = (req, res) => {
    ProjetModel.findByUser(req.params.UserId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.patchById = (req, res) => {
    ProjetModel.patchProjet(req.params.ProjetId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.removeById = (req, res) => {
    ProjetModel.removeById(req.params.ProjetId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};