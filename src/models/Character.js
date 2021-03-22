import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  modified: Date,
  thumbnail: String
});

const CharacterModel = mongoose.model('Character', CharacterSchema);

export default CharacterModel;