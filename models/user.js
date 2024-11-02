const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  artworkName: { type: String, required: true },
  artistName: { type: String, required: true },
  materials: { type: String },
  size: { type: String },
  imageUrl: { type: String, required: true},
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  artworks: [artworkSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
