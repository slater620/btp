const StockModel = require('../models/stocks.model');

exports.insert = (req, res) => {
    StockModel.createStock(req.body)
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
    StockModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        })
};

exports.getById = (req, res) => {
    StockModel.findById(req.params.StockId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.getByProjetId = (req, res) => {
    StockModel.findByProjet(req.params.ProjetId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};


exports.patchById = (req, res) => {
    StockModel.patchStock(req.params.StockId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.removeById = (req, res) => {
    StockModel.removeById(req.params.StockId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.deleteById=(req, res)=>{
    StockModel.patchStockRemove(req.params.StockId,req.params.StockQuantite)
    .then((result)=>{
        res.status(204).send(result);
    }).catch(e=>{
        res.status(400).send({error: e.message});
    });
}