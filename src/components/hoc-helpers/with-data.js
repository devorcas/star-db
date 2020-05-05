import React, {Component} from "react";
import Spinner from "../spiner";
import ErrorIndicator from "../error-indicator";

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      hasError: false,
      loading: true
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        hasError: true
      });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.getData !== this.props.getData) {
        this.update();
      }
    }

    update() {
      this.setState({
        loading: true,
        hasError: false
      })

      this.props.getData()
      .then((data) => {
        this.setState({
          data,
          loading: false
        });
      });
    }

    componentDidMount() {
      this.update();
    }

    render() {
      const {data, hasError, loading} = this.state;

      if (hasError) {
        return <ErrorIndicator/>;
      }

      if (loading) {
        return <Spinner/>;
      }

      return <View {...this.props} data={data}/>;
    }
  };
}

export default withData;