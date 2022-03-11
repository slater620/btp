const StocksController = require('./controllers/stocks.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Stocks', [
        //ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        StocksController.insert
    ]);
    
    app.get('/Stocks', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        StocksController.list
    ]);
    app.get('/Stocks/:StockId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        StocksController.getById
    ]);


    app.get('/Stocks/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        StocksController.getByUser
    ]);

    app.patch('/Stocks/:StockId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        StocksController.patchById
    ]);
    app.delete('/Stocks/:StockId', [
        ValidationMiddleware.validJWTNeeded,
        StocksController.removeById
    ]);

    app.delete('/Stocks/:StockId/:StockQuantite', [
        ValidationMiddleware.validJWTNeeded,
        StocksController.deleteById
    ]);
    
    app.get('/',(req,res)=>{
        return res.status(200).send('Welcome API Started.....')
    })
};
