import amqp from 'amqplib/callback_api.js';
import MarvelService from '../services/MarvelService.js';
import CharacterModel from "../models/Character.js";
import ComicModel from "../models/Comic.js";

class CharacterController {

  async list(request, response) {

    const marvelCharacterResponse = await MarvelService.execute("characters", "name=Avengers");

    if (!marvelCharacterResponse) {
      return response.status(400).json({ error: "Error on Marvel API" })
    }

    const marvelComicsResponse = await MarvelService.execute("comics", `characters=${marvelCharacterResponse.data.results[0].id}`);

    if (!marvelComicsResponse) {
      return response.status(400).json({ error: "Error on Marvel API" })
    }

    const marvelComics = marvelComicsResponse.data.results;

    const avengersCharacter = {
      id: marvelCharacterResponse.data.results[0].id,
      name: marvelCharacterResponse.data.results[0].name,
      description: marvelCharacterResponse.data.results[0].description,
      modified: marvelCharacterResponse.data.results[0].modified,
      thumbnail: marvelCharacterResponse.data.results[0].thumbnail.path,
      comics: marvelComics
    };

    return response.json(avengersCharacter);
  }

  async import(request, response) {

    // Get Marvel API infos
    const marvelCharacterResponse = await MarvelService.execute("characters", "name=Avengers");

    if (!marvelCharacterResponse) {
      return response.status(400).json({ error: "Error on Marvel API" })
    }

    const marvelComicsResponse = await MarvelService.execute("comics", `characters=${marvelCharacterResponse.data.results[0].id}`);

    if (!marvelComicsResponse) {
      return response.status(400).json({ error: "Error on Marvel API" })
    }

    const marvelComics = marvelComicsResponse.data.results;

    const avengersCharacter = {
      id: marvelCharacterResponse.data.results[0].id,
      name: marvelCharacterResponse.data.results[0].name,
      description: marvelCharacterResponse.data.results[0].description,
      modified: marvelCharacterResponse.data.results[0].modified,
      thumbnail: marvelCharacterResponse.data.results[0].thumbnail.path
    };

    // Save directly on DB
    const characterModel = new CharacterModel(avengersCharacter);
    characterModel.save((err, character) => {
      const characterId = character._id;

      marvelComics.map(comic => {
        const avengersComic = {
          id: comic.id,
          title: comic.title,
          resourceURI: comic.resourceURI,
          characters: [characterId]
        };
        const comicModel = new ComicModel(avengersComic);
        comicModel.save();
      });
    });

    // Send to queue "Avengers"
    const rabbitmqUrl = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}`
      + `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

    amqp.connect(rabbitmqUrl, function (error0, connection) {
      if (error0) {
        return response.status(400).json({ error: "Error on RabbitMQ" })
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          return response.status(400).json({ error: "Error on RabbitMQ" })
        }
        const queue = 'Avengers';

        channel.assertQueue(queue, {
          durable: false
        });

        marvelComics.map(comic => {
          channel.sendToQueue(queue, Buffer.from([comic]));
        });
      });
    });

    return response.status(200).json({ message: "Success" });
  }
}

export default CharacterController;