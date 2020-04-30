import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../ramdom-palanet";

import "./app.css"
import "./"
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import {
  PersonDetails,
  PersonList,
  PlanetDetails,
  PlanetList,
  StarshipDetails,
  StarshipList
} from '../sw-components'
import ErrorBoundary from "../error-boundary/error-boundary";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
        <ErrorBoundary>
          <SwapiServiceProvider value={this.swapiService}>
            <div className="">
              <Header/>
              {/*{planet}*/}
              {/*<PeoplePage/>*/}
              {/*<Row left={personDetails}*/}
              {/*     right={starsshipDetails}/>*/}

              <PersonDetails itemId={11}/>
              <PlanetDetails itemId={5}/>
              <StarshipDetails itemId={9}/>

              <PersonList/>
              <StarshipList/>
              <PlanetList/>
            </div>
          </SwapiServiceProvider>
        </ErrorBoundary>
    );
  }
}