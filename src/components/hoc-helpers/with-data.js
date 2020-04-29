import React, {Component} from "react";
import Spinner from "../spiner";
import ErrorIndicator from "../error-indicator";

const withData = (View, getData) => {
  return class extends Component {

    state = {
      data: null,
      hasError: false
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        hasError: true
      });
    }

    componentDidMount() {
      getData
      .then((data) => {
        this.setState({
          data
        });
      });
    }

    render() {
      const {data, hasError} = this.state;

      if (hasError) {
        return <ErrorIndicator/>;
      }

      if (!data) {
        return <Spinner/>;
      }

      return <View {...this.props} data={data}/>;
    }
  };
}

export default withData;