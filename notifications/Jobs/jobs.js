var schedule = require("node-schedule");
const sendMail = require("../mailSender/sendMail");
const NotificationModel = require("../models/notifications.model");
const UserModel = require("../../users/models/users.model");
const TacheModel = require("../../taches/models/taches.model");
const Allocation = require("../../allocations/models/allocations.model");
const ProjetModel=require("../../projets/models/projets.model");

const deltaT = 60000;

// const rule0 = new schedule.RecurrenceRule();
// rule0.minute = 15;
// const job0 = schedule.scheduleJob(rule0, sendNotif);

exports.job = async function sendNotif() {
  let l = await TacheModel.list2();
  let x = 0;
  for (let i = 0; i < l.length; i++) {
    
    if (l[i].actif == true) {
      console.log(l[i])
    
      x = ((new Date() - l[i].dateDebut) *1)/ (l[i].dateFin - l[i].dateDebut);
      let prjt=await ProjetModel.findById(l[i].projet)
      let user = await UserModel.findById(prjt.user);
      if (x < 0) {
        await NotificationModel.createNotification({
          title: "retard",
          tache: l[i].id,
          state: false,
          body: "Votre tache accuse un retard",
        });
        await TacheModel.patchTache(l[i].id, { actif: false });
        await sendMail.mail(
          user.email,
          "Delais depasse pour la tache",
          "la tache devant se terminer le " +
          l[i].dateFin +
            " ne l'est pas encore sur ce vous accusez un retard "
        );
    
      }
      if (x >= 0.75) {
        await sendMail.mail(
          user.email,
          "Delais",
          "la tache demarree le  "+ l[i].dateDebut+" devant seterminer le " +
          l[i].dateFin +
            " ne l'est pas encore sur ce vous avez utilise 75% du temps qui vous a ete alloue"
        );
        await NotificationModel.createNotification({
          title: "rapel",
          tache: l[i].id,
          state: false,
          body: "Votre tache a utilise 75% du delais",
        });
        await TacheModel.patchTache(l[i].id, { actif: false });
      }
    }
  }
  console.log("Notif send");
}



exports.job2 = async function sendNotif2(){
  let l = await Allocation.list2();

  for(let i=0;i<l.length;i++){
    let x=l[i].quantitRestante/l[i].quantiteInitiale;
    if(x<0.25){
      let tache=await TacheModel.findById(l[i].tache);
      let prjt=await ProjetModel.findById(tache.projet)
      let user = await UserModel.findById(prjt.user);
      await NotificationModel.createNotification({
        title: "Stock bientot epuise",
        tache: l[i].tache,
        state: false,
        body: "Le stock alloue pour la tache est epuise a 75%",
      });
      await TacheModel.patchTache(l[i].id, { actif: false });
      await sendMail.mail(
        user.email,
        "Rupture de Stock imminante",
        "Votre tache  n'est pas encore terminee mais la ressource sera bientot epuisee "
      );      
    }
  }
  console.log("Notif send2");  
}