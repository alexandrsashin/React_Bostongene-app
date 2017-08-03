import React, { Component } from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    return this.props.showError && this.props.errorText !== "";
  }

  render() {
    return (
      <div className="form__select-wrapper">
        <label className="form__label" htmlFor={this.props.id}>{this.props.label}</label>
        <select className="form__select" 
                id={this.props.id}
                name={this.props.id}
                onChange={this.props.onFieldChanged}>
          <option disabled>Choose town</option>
          <option value="Nikologory">Nikologory</option>
          <option value="Dolgoprudny">Dolgoprudny</option>
          <option value="Moscow">Moscow</option>
        </select>
        <OptionallyDisplayed display={this.shouldDisplayError()}>
          <div className="form__comment">{this.props.errorText}</div>
        </OptionallyDisplayed>
      </div>
    );
  }
}

Select.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};

export default Select;

