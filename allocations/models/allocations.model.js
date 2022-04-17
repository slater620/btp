const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const AllocationSchema = new Schema({
    quantiteInitiale: Number,
    quantitRestante: Number,
    tache: { type: mongoose.Schema.Types.ObjectId, ref: "Taches" },
    stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stocks" }       
},
{ timestamps: true });

AllocationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AllocationSchema.set('toJSON', {
    virtuals: true
});

AllocationSchema.findById = function (cb) {
    return this.model('Allocations').find({id: this.id}, cb);
};


const Allocation = mongoose.model('Allocations', AllocationSchema);


exports.findByTache = (tache) => {
    return Allocation.find({tache: tache});
};

exports.findByStock = (stock) => {
    return Allocation.find({stock: stock});
};

exports.findById = (id) => {
    return Allocation.findById(id)
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

exports.createAllocation = (AllocationData) => {
    const allocation = new Allocation(AllocationData);
    return allocation.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Allocation.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Allocations) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Allocations);
                }
            })
    });
};


exports.list2 = () => {
    return new Promise((resolve, reject) => {
        Allocation.find()
            .exec(function (err, Allocations) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Allocations);
                }
            })
    });
};

exports.patchAllocation = (id, AllocationData) => {
    return Allocation.findOneAndUpdate({
        _id: id
    }, AllocationData);
};

exports.removeById = (AllocationId) => {
    return new Promise((resolve, reject) => {
        Allocation.deleteMany({_id: AllocationId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

