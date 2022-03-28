const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({
    description: String,
    quantiteDemande:Number,
    quantiteRecu:Number,
    prix:Number,
    coutTransport:Number,
    DureeReapprovisionnement:String,
    denomination:String,
    stock:{ type: mongoose.Schema.Types.ObjectId, ref: "Stocks",required: true},
    dateCommande:Date,
    dateArrivee:Date
 }
,
  { timestamps: true });

CommandeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CommandeSchema.set('toJSON', {
    virtuals: true
});

CommandeSchema.findById = function (cb) {
    return this.model('Commandes').find({id: this.id}, cb);
};

const Commande = mongoose.model('Commandes', CommandeSchema);



exports.findByStock = (stock) => {
    return Commande.find({stock: stock});
};
exports.findById = (id) => {
    return Commande.findById(id)
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

exports.createCommande = (CommandeData) => {
    const commande = new Commande(CommandeData);
    return commande.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Commande.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Commandes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Commandes);
                }
            })
    });
};

exports.patchCommande = (id, CommandeData) => {
    return Commande.findOneAndUpdate({
        _id: id
    }, CommandeData);
};

exports.removeById = (CommandeId) => {
    return new Promise((resolve, reject) => {
        Commande.deleteMany({_id: CommandeId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

Commande.createIndexes();
