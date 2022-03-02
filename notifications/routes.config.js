const NotificationsController = require('./controllers/notifications.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const fetch=require("node-fetch");

exports.routesConfig = function (app) {
    app.post('/Notifications', [
        NotificationsController.insert
    ]);
    
    app.get('/Notifications', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        NotificationsController.list
    ]);
    app.get('/Notifications/:notificationId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        NotificationsController.getById
    ]);

    app.get('/Notifications/user/:UserId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        NotificationsController.getByUserId
    ]);

    app.patch('/Notifications/:notificationId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        NotificationsController.patchById
    ]);
    app.delete('/Notifications/:notificationId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        NotificationsController.removeById
    ]);
    
};
