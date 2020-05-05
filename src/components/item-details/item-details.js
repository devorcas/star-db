import React, {Component} from "react";

import "./item-details.css";

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  }

  constructor(props) {
    super(props);
    console.log('constructor() ');
  }

  componentDidMount() {
    console.log('componentDidMount() ');
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate() ');

    if (this.props.itemId !== prevProps.itemId
        || this.props.getData !== prevProps.getData
        || this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
    .then((item) => {
      this.setState({
        item: item,
        image: getImageUrl(item)
      });
    });
  }

  render() {
    const {item, image} = this.state;

    if (!item) {
      return (<span>Select item from a list</span>);
    }

    const {name} = item;

    return (
        <div className="item-details card">
          <img className="item-image"
               src={image}
               alt="item"/>

          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              {
                React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, {item});
                })
              }
            </ul>
          </div>
        </div>
    );
  }
}

const Record = ({item, field, label}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}:</span>
        <span>{item[field]}</span>
      </li>
  )
};

export {
  Record
};