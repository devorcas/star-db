import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../ramdom-palanet";

import "./app.css"
import "./"
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import ErrorBoundary from "../error-boundary/error-boundary";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetPage, StarshipPage} from "../pages";

import {BrowserRouter as Router, Route} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  }

  onChangeService = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
          DummySwapiService : SwapiService;

      console.log("swiched to", Service.name);

      return {
        swapiService: new Service()
      }
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    return (
        <ErrorBoundary>
          <SwapiServiceProvider value={this.state.swapiService}>
            <Router>
              <div className="">
                <Header onServiceChange={this.onChangeService}/>
                <RandomPlanet/>

                <Route path='/'
                       render={() => <h2>Welcome to StarDB</h2>}
                       exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" component={StarshipPage} exact/>
                <Route path="/starships/:id"
                       render={({match, location, history}) => {
                         const {id} = match.params
                         return <StarshipDetails itemId={id}/>
                       }}/>
              </div>
            </Router>
          </SwapiServiceProvider>
        </ErrorBoundary>
    );
  }
}