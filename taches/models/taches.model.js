const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const AllocModel=require('../../allocations/models/allocations.model');
const TacheSchema = new Schema({
    nom: String,
    projet: { type: mongoose.Schema.Types.ObjectId, ref: "Projets" },
    dateDebut:Date,
    dateFin:Date,
    actif:{type:Boolean,default:true},
    description: { type: String }        
},
{ timestamps: true });

TacheSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TacheSchema.set('toJSON', {
    virtuals: true
});

TacheSchema.findById = function (cb) {
    return this.model('Taches').find({id: this.id}, cb);
};

const Tache = mongoose.model('Taches', TacheSchema);


exports.findByProjet = (projet) => {
    return Tache.find({projet: projet}).sort({created_at:-1});
};

exports.findById = (id) => {
    return Tache.findById(id)
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

exports.createTache = (TacheData) => {
    const tache = new Tache(TacheData);
    return tache.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Tache.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Taches) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Taches);
                }
            })
    });
};

exports.list2 = () => {
    return new Promise((resolve, reject) => {
        Tache.find().sort({created_at:-1})
            .exec(function (err, Taches) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Taches);
                }
            })
    });
};


exports.patchTache = (id, TacheData) => {
    return Tache.findOneAndUpdate({
        _id: id
    }, TacheData);
};

exports.removeById = (TacheId) => {
    var l=AllocModel.findByTache(TacheId);
    for (let i=0; i<l.length; i++) {
        AllocModel.removeById(l[i]._id);
    }
    
    return new Promise((resolve, reject) => {
        Tache.deleteMany({_id: TacheId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

