const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const taches= require('./taches/models/taches.model');
const AuthorizationRouter = require('./authorization/routes.config');
const ProjectRouter = require('./projets/routes.config');
const UsersRouter = require('./users/routes.config');
const NotificationsRouter = require('./notifications/routes.config');
const TachesRouter=require('./taches/routes.config');
const StocksRouter=require('./stocks/routes.config');
const AllocationRouter = require('./allocations/routes.config')
const test=require('./notifications/mailSender/sendMail');
const notif=require('./notifications/Jobs/jobs');
const TypeRouter=require('./types/routes.config');
const CommandeRouter= require('./commandes/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
NotificationsRouter.routesConfig(app);
AllocationRouter.routesConfig(app);
TachesRouter.routesConfig(app);
StocksRouter.routesConfig(app);
ProjectRouter.routesConfig(app);
TypeRouter.routesConfig(app);
CommandeRouter.routesConfig(app);

app.set('port',(process.env.PORT || config.port));

app.listen(app.get('port'), function () {
    console.log('app listening at port %s', app.get('port'));
});

// test.mail("ffomekong.megasoft@gmail.com","alert","stock epuise").catch((e)=>{
//     console.log(e)
// })
const deltaT=6000;
setInterval(notif.job,deltaT);
setInterval(notif.job2,deltaT+10000);

// const tache = taches.createTache({
//     nom:'dormir',
//     user:'61fd149bf673c7105385c671',
//     dateDebut:new Date(),
//     dateFin:new Date()+1,
//     description:"urgent"
// });
