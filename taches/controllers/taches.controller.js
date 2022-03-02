const TacheModel = require('../models/taches.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    TacheModel.createTache(req.body)
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
    TacheModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.getById = (req, res) => {
    TacheModel.findById(req.params.tacheId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.getByProjetId = (req, res) => {
    TacheModel.findByProjet(req.params.ProjetId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.patchById = (req, res) => {
    TacheModel.patchTache(req.params.TacheId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.removeById = (req, res) => {
    TacheModel.removeById(req.params.tacheId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};