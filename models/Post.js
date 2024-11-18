const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    numberOfIceCreams: { type: Number, required: true },
    dateOfIceCream: { type: Date, required: true },
    placeOfIceCream: { type: String, required: true },
    ateInGroup: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Post', postSchema);