const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const StockSchema = new Schema(
  {
    nom: String,
    denomination: String,//unite
    quantite: Number,
    prixUnitaire: Number,
    type: {
      type:String,
      enum:["Materiel","Materiau"],
      required: true,
    },
    projet:{type: mongoose.Schema.Types.ObjectId, ref: "Projets"},
    dureeApprovisionnement: String
  },
  { timestamps: true }
);

StockSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
StockSchema.set("toJSON", {
  virtuals: true,
});

StockSchema.findById = function (cb) {
  return this.model("Stocks").find({ id: this.id }, cb);
};



const Stock = mongoose.model("Stocks", StockSchema);

exports.findByNom = (nom) => {
  return Stock.find({ nom: nom });
};

exports.findByProjet = (projet) => {
  return Stock.find({projet: projet}).sort({created_at:-1});
};

exports.findById = (id) => {
  return Stock.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  }).catch(e=>{
    console.log(e.message);
    return [];
});
};

exports.createStock = (StockData) => {
  const stock = new Stock(StockData);
  return stock.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Stock.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, Stocks) {
        if (err) {
          reject(err);
        } else {
          resolve(Stocks);
        }
      });
  });
};

exports.patchStock = (id, StockData) => {
  return Stock.findOneAndUpdate(
    {
      _id: id,
    },
    StockData
  );
};

exports.patchStockRemove = async (id, quantite) => {
  //console.log(id);
  var res = await Stock.findById(id).then((result) => {
    //console.log(result);
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    //console.log(result);
    return result;
  }).catch(e=>{
    console.log(e.message);
    return [];
});
  //console.log(res);
  res.quantite = res.quantite - quantite;
  if (res.quantite >= 0)
    return Stock.findOneAndUpdate(
      {
        _id: id,
      },
      res
    );
  else
      throw new Error("failed to remove stocks");
  //return { status: "remove failed" };
};

exports.removeById = (StockId) => {
  return new Promise((resolve, reject) => {
    Stock.deleteMany({ _id: StockId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
