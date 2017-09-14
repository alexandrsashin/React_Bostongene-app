import PropTypes from "prop-types";
import React, { Component } from "react";

import _ from "lodash";
import { MultiSelect } from "react-selectize";
import "react-selectize/dist/index.css";

import "./AppSelect.css";

class AppSelect extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array.isRequired,
    onSetOptions: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    // it's important for lib "react-selectize" to have "label" and "value" value with string type
    this.state = {
      options: props.options.map(elem => ({
        label: elem.toString(),
        value: elem.toString()
      })),
      selectedOptions: props.selectedOptions.map(elem => ({
        label: elem.toString(),
        value: elem.toString()
      }))
    };
    this.onValuesChange = this.onValuesChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.createFromSearch = this.createFromSearch.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.valuesFromPaste = this.valuesFromPaste.bind(this);
  }

  // it's important for lib "react-selectize" to have "label" and "value" value with string type
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options.map(elem => ({
        label: elem.toString(),
        value: elem.toString()
      })),
      selectedOptions: nextProps.selectedOptions.map(elem => ({
        label: elem.toString(),
        value: elem.toString()
      }))
    });
  }

  onValuesChange(selectedOptions) {
    this.setState({ selectedOptions }, () =>
      this.props.onSetOptions(selectedOptions)
    );
  }

  valuesFromPaste(options, values, pastedText) {
    return pastedText
      .split(",")
      .filter(text => {
        const labels = values.map(item => item.label);
        return labels.indexOf(text) === -1;
      })
      .map(text => ({ label: text, value: text }));
  }

  createFromSearch(options, values, search) {
    const labels = values.map(value => value.label);
    const searchValue = search.trim();
    if (searchValue.length === 0 || labels.indexOf(searchValue) !== -1) {
      return null;
    } else {
      return { label: searchValue, value: searchValue };
    }
  }

  removeItem(item) {
    const selectedOptions = _.reject(
      this.state.selectedOptions,
      elem => elem.value === item.value
    );
    this.setState({ selectedOptions: selectedOptions });
    this.props.onSetOptions(selectedOptions);
  }

  renderOption(item) {
    return (
      <div className="simple-option">
        <span>{item.label}</span>
      </div>
    );
  }
  renderValue(item) {
    return (
      <button className="btn btn-primary">
        <span>{item.label}</span>
        <span
          className="removable-tag__cross"
          onClick={() => this.removeItem(item)}
        >
          ✕
        </span>
      </button>
    );
  }
  render() {
    return (
      <MultiSelect
        placeholder={this.props.placeholder}
        options={this.state.options}
        values={this.state.selectedOptions}
        restoreOnBackspace={item => item.label}
        onValuesChange={this.onValuesChange}
        uid={item => item.label}
        createFromSearch={this.createFromSearch}
        valuesFromPaste={this.valuesFromPaste}
        renderOption={this.renderOption}
        renderValue={this.renderValue}
      />
    );
  }
}

export default AppSelect;
