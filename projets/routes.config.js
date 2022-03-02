const ProjetsController = require('./controllers/projets.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Projets', [ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ProjetsController.insert
    ]);
    
    app.get('/Projets', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProjetsController.list
    ]);
    app.get('/Projets/:ProjetId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ProjetsController.getById
    ]);

    app.get('/Projets/user/:UserId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ProjetsController.getByUserId
    ]);
    
    app.patch('/Projets/:ProjetId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ProjetsController.patchById
    ]);
    app.delete('/Projets/:ProjetId', [
        ValidationMiddleware.validJWTNeeded,
        ProjetsController.removeById
    ]);
    
};
