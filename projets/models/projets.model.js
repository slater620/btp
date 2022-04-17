const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const TacheModel=require('../../taches/models/taches.model');
const StockModel=require('../../stocks/models/stocks.model');

const ProjetSchema = new Schema({
    nom: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
}
,
  { timestamps: true });

ProjetSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProjetSchema.set('toJSON', {
    virtuals: true
});

ProjetSchema.findById = function (cb) {
    return this.model('Projets').find({id: this.id}, cb);
};

const Projet = mongoose.model('Projets', ProjetSchema);


exports.findByNom = (nom) => {
    return Projet.find({nom: nom});
};

exports.findByUser = (user) => {
    return Projet.find({user: user}).sort({created_at:-1});
};

exports.findById = (id) => {
    return Projet.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        }).catch(e=>{
            console.log(e.message);
            return [];
        });
};

exports.createProjet = (ProjetData) => {
    const projet = new Projet(ProjetData);
    return projet.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Projet.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Projets) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Projets);
                }
            })
    });
};

exports.patchProjet = (id, ProjetData) => {
    return Projet.findOneAndUpdate({
        _id: id
    }, ProjetData);
};

exports.removeById = (ProjetId) => {
    var l=TacheModel.findByProjet(ProjetId);
    for (let i=0; i<l.length; i++) {
        TacheModel.removeById(l[i]._id);
    }
    var l2=StockModel.findByProjet(ProjetId);
    for(let i=0; i<l2.length; i++) {
        StockModel.removeById(l2[i]._id);
    }
    return new Promise((resolve, reject) => {
        Projet.deleteMany({_id: ProjetId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

