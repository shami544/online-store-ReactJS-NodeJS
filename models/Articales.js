const mongoose = require("mongoose");

const { Schema } = mongoose;

const ArticalesSchema = new Schema({
  category:String,
  name: String,
  title: String,
  information: String,
  price: Number,
  number: Number,
  file: [String],
}
);

const Articales = mongoose.model('Articales', ArticalesSchema);
module.exports = Articales; 