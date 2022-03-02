const CommandesController = require('./controllers/commandes.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Commandes', [ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CommandesController.insert
    ]);
    
    app.get('/Commandes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        CommandesController.list
    ]);
    app.get('/Commandes/:CommandeId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CommandesController.getById
    ]);


    app.get('/Commandes/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CommandesController.getByUser
    ]);

    app.patch('/Commandes/:CommandeId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CommandesController.patchById
    ]);
    app.delete('/Commandes/:CommandeId', [
        ValidationMiddleware.validJWTNeeded,
        CommandesController.removeById
    ]);
    
};
