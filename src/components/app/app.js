import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../ramdom-palanet";

import "./app.css"
import "./"
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import ErrorBoundary from "../error-boundary/error-boundary";
import DummySwapiService from "../../services/dummy-swapi-service";
import {
  LoginPage,
  PeoplePage,
  PlanetPage,
  SecretPage,
  StarshipPage
} from "../pages";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
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
    const {swapiService, isLoggedIn} = this.state;
    return (
        <ErrorBoundary>
          <SwapiServiceProvider value={swapiService}>
            <Router>
              <div className="">
                <Header onServiceChange={this.onChangeService}/>
                <RandomPlanet/>
                <Switch>
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
                  <Route path="/login"
                         render={() => (
                             <LoginPage isLoggedIn={isLoggedIn}
                                        onLogin={this.onLogin}/>
                         )}/>
                  <Route path="/secret"
                         render={() => (
                             <SecretPage isLoggedIn={isLoggedIn}/>
                         )}/>
                  <Route render={() => (<h2>PageNotFound</h2>)}/>
                </Switch>
              </div>
            </Router>
          </SwapiServiceProvider>
        </ErrorBoundary>
    );
  }
}