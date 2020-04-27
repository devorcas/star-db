import React, {Component} from "react";

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "./row";
import ErrorBoundary from "../error-boundary/error-boundary";


export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: false
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    const itemList = (
        <ItemList onItemSelect={this.onPersonSelected}
                  getData={this.swapiService.getAllPeople}>
          {(i) => `${i.name}  ( ${i.birthYear})`}
        </ItemList>
    );

    const itemDetails = (
        <ErrorBoundary>
          <ItemDetails itemId={this.state.selectedPerson}/>
        </ErrorBoundary>
    );

    return (<Row left={itemList}
                 right={itemDetails}/>

    );
  }
}