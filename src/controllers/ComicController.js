import MarvelService from '../services/MarvelService.js';
import ComicModel from "../models/Comic.js";

class ComicController {

  async execute(request, response) {
    const { id } = request.params;

    const comic = await ComicModel.findOne({ id });

    if (!comic) {
      return response.status(404).json({ error: "Comic not found" });
    }

    const marvelComicsResponse = await MarvelService.executeByUrl(comic.resourceURI);

    return response.json(marvelComicsResponse);
  }
}

export default ComicController;