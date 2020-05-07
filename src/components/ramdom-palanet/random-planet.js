import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import PropTypes from 'prop-types';

import './random-planet.css';
import Spinner from "../spiner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  static propTypes = {
    updateInterval: PropTypes.number
  }

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const {updateInterval} = this.props;
    this.updatePlanet()
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onPlanedLoaded = (planet) => {
    this.setState({
      planet,
      loading: false});
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 1;
    this.swapiService
    .getPlanet(id)
    .then(this.onPlanedLoaded)
    .catch(this.onError);
  }

  render() {
    const {planet,
          loading, error} = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
          {errorMessage}
        </div>
    );
  }
};

RandomPlanet.defaultProps = {
  updateInterval: 10000
}

const PlanetView = ( {planet}) => {

  const {id, name, population, rotationPeriod, diameter} = planet;
  return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  )
}