import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../ramdom-palanet";
import ItemDetails, {Record} from "../item-details/item-details";

import "./app.css"
import "./"
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../people-page/row";

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

    const {getPerson, getStarship
    , getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = (
        <ItemDetails itemId={11}
                     getData={getPerson}
                     getImageUrl={getPersonImage}>

          <Record field="gender" label="Gender"/>
          <Record field="eyeColor" label="Eye color"/>

        </ItemDetails>
    );

    const starsshipDetails = (
        <ItemDetails itemId={5}
                     getData={getStarship}
                     getImageUrl={getStarshipImage}>

          <Record field="model" label="Model"/>
          <Record field="length" label="Length"/>
          <Record field="costInCredits" label="Cost"/>

        </ItemDetails>
    );

    return (<div className="">
          <Header/>
          {/*{planet}*/}
          {/*<PeoplePage/>*/}
          <Row left={personDetails}
               right={starsshipDetails}/>
        </div>
    );
  }
}