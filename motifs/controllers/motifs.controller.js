const MotifModel = require('../models/motifs.model');

exports.insert = (req, res) => {
    MotifModel.createMotif(req.body)
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
    MotifModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        })
};

exports.getById = (req, res) => {
    MotifModel.findById(req.params.MotifId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.getByUser = (req, res) => {
    MotifModel.findByUser(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.patchById = (req, res) => {
    MotifModel.patchMotif(req.params.MotifId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.removeById = (req, res) => {
    MotifModel.removeById(req.params.MotifId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.deleteById=(req, res)=>{
    MotifModel.patchMotifRemove(req.params.MotifId,req.params.MotifQuantite)
    .then((result)=>{
        res.status(204).send(result);
    }).catch(e=>{
        res.status(400).send({error: e.message});
    });
}