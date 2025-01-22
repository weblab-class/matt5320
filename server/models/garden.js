const mongoose = require("mongoose");

const GardenSchema = new mongoose.Schema({
  googleid: String,
  plants: [String],
  x: [Number],
  y: [Number],
});

// compile model from schema
module.exports = mongoose.model("garden", GardenSchema);
