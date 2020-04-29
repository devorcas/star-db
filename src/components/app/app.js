import React, {Component} from "react";

import Header from "../header";
import PeoplePage from "../people-page";
import RandomPlanet from "../ramdom-palanet";
import ItemDetails, {Record, withDetails} from "../item-details/item-details";

import "./app.css"
import "./"
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../people-page/row";
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components'


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

    return (<div className="">
          <Header/>
          {/*{planet}*/}
          {/*<PeoplePage/>*/}
          {/*<Row left={personDetails}*/}
          {/*     right={starsshipDetails}/>*/}

          <PersonDetails itemId={11}/>
          <PlanetDetails itemId={5}/>
          <StarshipDetails itemId={9}/>

          <PersonList>
            { ({name}) => <span>{name}</span>}
          </PersonList>
          <StarshipList>
            { ({name}) => <span>{name}</span>}
          </StarshipList>
          <PlanetList>
            { ({name}) => <span>{name}</span>}
          </PlanetList>
        </div>
    );
  }
}