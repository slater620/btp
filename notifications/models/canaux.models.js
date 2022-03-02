const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const CanauxSchema = new Schema({
    title: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    state:Boolean,
    body: { type: String },        
}
,
  { timestamps: true });

CanauxSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CanauxSchema.set('toJSON', {
    virtuals: true
});

CanauxSchema.findById = function (cb) {
    return this.model('Canaux').find({id: this.id}, cb);
};

const Canaux = mongoose.model('Canaux', CanauxSchema);


exports.findById = (id) => {
    return Canaux.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCanaux = (CanauxData) => {
    const canaux = new Canaux(CanauxData);
    return canaux.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Canaux.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Canauxs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Canauxs);
                }
            })
    });
};

exports.patchCanaux = (id, CanauxData) => {
    return Canaux.findOneAndUpdate({
        _id: id
    }, CanauxData);
};

exports.removeById = (CanauxId) => {
    return new Promise((resolve, reject) => {
        Canaux.deleteMany({_id: CanauxId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

