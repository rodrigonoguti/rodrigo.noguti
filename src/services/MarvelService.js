import fetch from "node-fetch";
import md5 from "md5";

function getMarvelHash() {
  const marvelTs = Date.now();
  const marvelHash = md5(marvelTs
    + process.env.MARVEL_PRIVATE_KEY
    + process.env.MARVEL_PUBLIC_KEY
  );
  const marvelHashUrl = `ts=${marvelTs}`
    + `&apikey=${process.env.MARVEL_PUBLIC_KEY}`
    + `&hash=${marvelHash}`;

  return marvelHashUrl;
}

class MarvelService {

  async execute(entity, additionalParameters = '') {
    const marvelHash = getMarvelHash();
    const marvelUrl = `${process.env.MARVEL_API_URL}/v1/public/${entity}?`
      + marvelHash
      + `&${additionalParameters}`;

    const marvelResponse = await fetch(marvelUrl)
      .then(response => response.json())
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });

    return marvelResponse;
  }

  async executeByUrl(url) {
    const marvelHash = getMarvelHash();

    const marvelUrl = `${url}?` + marvelHash;

    const marvelResponse = await fetch(marvelUrl)
      .then(response => response.json())
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });

    return marvelResponse;
  }
}

export default new MarvelService();