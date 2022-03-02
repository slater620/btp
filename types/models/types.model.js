const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    nom: String,
    description: { type: String, required: true, unique: true,index:true },
}
,
  { timestamps: true });

TypeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TypeSchema.set('toJSON', {
    virtuals: true
});

TypeSchema.findById = function (cb) {
    return this.model('Types').find({id: this.id}, cb);
};

const Type = mongoose.model('Types', TypeSchema);


exports.findByNom = (nom) => {
    return Type.find({nom: nom});
};
exports.findById = (id) => {
    return Type.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createType = (TypeData) => {
    const Type = new Type(TypeData);
    return Type.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Type.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Types) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Types);
                }
            })
    });
};

exports.patchType = (id, TypeData) => {
    return Type.findOneAndUpdate({
        _id: id
    }, TypeData);
};

exports.removeById = (TypeId) => {
    return new Promise((resolve, reject) => {
        Type.deleteMany({_id: TypeId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

