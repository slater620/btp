const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const MotifSchema = new Schema(
  {
    motif: String,
    stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stocks" },
  },
  { timestamps: true }
);

MotifSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MotifSchema.set("toJSON", {
  virtuals: true,
});

MotifSchema.findById = function (cb) {
  return this.model("Motifs").find({ id: this.id }, cb);
};

const Motif = mongoose.model("Motifs", MotifSchema);

exports.findByNom = (nom) => {
  return Motif.find({ nom: nom });
};

exports.findByUser = (user) => {
  return Motif.find({ user: user });
};
exports.findById = (id) => {
  return Motif.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  }).catch(e=>{
    console.log(e.message);
    return [];
});
};

exports.createMotif = (MotifData) => {
  const motif = new Motif(MotifData);
  return motif.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Motif.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, Motifs) {
        if (err) {
          reject(err);
        } else {
          resolve(Motifs);
        }
      });
  });
};

exports.patchMotif = (id, MotifData) => {
  return Motif.findOneAndUpdate(
    {
      _id: id,
    },
    MotifData
  );
};

exports.patchMotifRemove = async (id, quantite) => {
  //console.log(id);
  var res = await Motif.findById(id).then((result) => {
    //console.log(result);
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    //console.log(result);
    return result;
  });
  //console.log(res);
  res.quantite = res.quantite - quantite;
  if (res.quantite >= 0)
    return Motif.findOneAndUpdate(
      {
        _id: id,
      },
      res
    );
  else
      throw new Error("failed to remove Motifs");
  //return { status: "remove failed" };
};

exports.removeById = (MotifId) => {
  return new Promise((resolve, reject) => {
    Motif.deleteMany({ _id: MotifId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
