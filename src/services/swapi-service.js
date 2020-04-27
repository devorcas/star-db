export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could fetch url ${url}` +
          `, received status ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  getPerson = async (id) => {
    const person =  await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  }

   getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet)
  }

   getStarship = async (id) => {
    let starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  }

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`
  }

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`
  }

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }
}