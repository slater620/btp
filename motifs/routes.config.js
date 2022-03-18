const MotifsController = require('./controllers/motifs.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/Motifs', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        MotifsController.insert
    ]);
    
    app.get('/Motifs', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        MotifsController.list
    ]);
    app.get('/Motifs/:MotifId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        MotifsController.getById
    ]);


    app.get('/Motifs/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        MotifsController.getByUser
    ]);

    app.patch('/Motifs/:MotifId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        MotifsController.patchById
    ]);
    app.delete('/Motifs/:MotifId', [
        ValidationMiddleware.validJWTNeeded,
        MotifsController.removeById
    ]);

    app.delete('/Motifs/:MotifId/:MotifQuantite', [
        ValidationMiddleware.validJWTNeeded,
        MotifsController.deleteById
    ]);
    
};
