const TachesController = require('./controllers/taches.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Taches', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        TachesController.insert
    ]);
    
    app.get('/Taches', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        TachesController.list
    ]);
    app.get('/Taches/:tacheId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        TachesController.getById
    ]);
   
    app.get('/Taches/projet/:ProjetId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        TachesController.getByProjetId
    ]);
   
    app.patch('/Taches/:tacheId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        TachesController.patchById
    ]);
    app.delete('/Taches/:tacheId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        TachesController.removeById
    ]);    
};
