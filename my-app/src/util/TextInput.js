import React, { Component } from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import PropTypes from 'prop-types';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    return this.props.showError && this.props.errorText !== "";
  }

  render() {
    return (
      <div className="form__input-wrapper">
        <label className="form__label" htmlFor={this.props.id}>{this.props.label}</label>
        <input className="form__input" 
               type={this.props.type || "text"}
               placeholder={this.props.placeholder}
               onChange={this.props.onFieldChanged}
               id={this.props.id}
               name={this.props.id} />
        <OptionallyDisplayed display={this.shouldDisplayError()}>
          <div className="form__comment">{this.props.errorText}</div>
        </OptionallyDisplayed>
      </div>
    );
  }
}

TextInput.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};

export default TextInput;

