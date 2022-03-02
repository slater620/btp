const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    title: String,
    tache: { type: mongoose.Schema.Types.ObjectId, ref: "Taches" },
    state:Boolean,
    body: { type: String, required:true },        

}
,
  { timestamps: true });

NotificationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
NotificationSchema.set('toJSON', {
    virtuals: true
});

NotificationSchema.findById = function (cb) {
    return this.model('Notifications').find({id: this.id}, cb);
};

const Notification = mongoose.model('Notifications', NotificationSchema);


exports.findByTache = (tache) => {
    return Notification.find({tache: tache}).sort({created_at:-1});
};
const UserModel = require("../../users/models/users.model");
const TacheModel = require("../../taches/models/taches.model");
const Allocation = require("../../allocations/models/allocations.model");
const ProjetModel=require("../../projets/models/projets.model");

exports.findAllForUser=async (userId)=>{
    let listeProjets=ProjetModel.findByUser(userId);
    let listeTache=[];
    let listNotif=[];
    for (let i=0; i<listeProjets.length; i++) {
        listeTache=TacheModel.findByProjet(listeProjets[i].id);    
        for(let j=0;j<listeTache.length;j++){
            let listN=Notification.find({tache:listeTache[j].id}).sort({created_at:-1})
            for(let k=0;k<listN.length;k++){
                listNotif.push(listN[k]);
            }
        }
    }
    return listNotif
}


exports.findById = (id) => {
    return Notification.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};


exports.createNotification = (NotificationData) => {
    const notification = new Notification(NotificationData);
    return notification.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Notification.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Notifications) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Notifications);
                }
            })
    });
};

exports.patchNotification = (id, NotificationData) => {
    return Notification.findOneAndUpdate({
        _id: id
    }, NotificationData);
};

exports.removeById = (NotificationId) => {
    return new Promise((resolve, reject) => {
        Notification.deleteMany({_id: NotificationId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

