const AllocationsController = require('./controllers/allocations.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Allocations', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        AllocationsController.insert
    ]);
    
    app.get('/Allocations', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        AllocationsController.list
    ]);
    app.get('/Allocations/:AllocationId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        AllocationsController.getById
    ]);
    app.patch('/Allocations/:AllocationId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        AllocationsController.patchById
    ]);
    app.delete('/Allocations/:AllocationId', [
        ValidationMiddleware.validJWTNeeded,
        AllocationsController.removeById
    ]);    
};
