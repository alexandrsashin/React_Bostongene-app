import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionallyDisplayed extends Component {
  render() {
    return (this.props.display === true) ? <div>{this.props.children}</div> : null;
  }
}
OptionallyDisplayed.propTypes = {
  display: PropTypes.bool.isRequired
};

export default OptionallyDisplayed;

