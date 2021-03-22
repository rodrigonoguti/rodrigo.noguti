import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComicSchema = new Schema({
  id: Number,
  title: String,
  resourceURI: String,
  characters: [String]
});

const ComicModel = mongoose.model('Comic', ComicSchema);

export default ComicModel;