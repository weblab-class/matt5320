const mongoose = require("mongoose");

const GardenSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  userName: String,
  plants: [String],
  x: [Number],
  y: [Number],
  scaleX: [Number],
  scaleY: [Number],
});

// compile model from schema
module.exports = mongoose.model("garden", GardenSchema);
