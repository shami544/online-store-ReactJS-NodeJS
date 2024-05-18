const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategoryMarketSchema = new Schema({
  name: String,
  file: [String],
});

const CategoryMarket = mongoose.model('CategoryMarket', CategoryMarketSchema);
module.exports = CategoryMarket; 