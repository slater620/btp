const AllocationModel = require('../models/allocations.model');

exports.insert = (req, res) => {
    console.log(req.body);
    AllocationModel.createAllocation(req.body)
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
    AllocationModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        })
};

exports.getById = (req, res) => {
    AllocationModel.findById(req.params.AllocationId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};
exports.patchById = (req, res) => {
    AllocationModel.patchAllocation(req.params.AllocationId, req.body)
        .then((result) => {
            res.status(204).send({res:12});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};

exports.removeById = (req, res) => {
    AllocationModel.removeById(req.params.AllocationId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(e=>{
            res.status(400).send({error: e.message});
        });
};