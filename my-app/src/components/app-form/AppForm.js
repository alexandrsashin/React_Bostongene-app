import React, { Component } from 'react';
import TextInput from '../../util/TextInput.js';
import Textarea from '../../util/Textarea.js';
import Select from '../../util/Select.js';
import update from 'immutability-helper';
import { run, ruleRunner } from '../../validation/ruleRunner.js'
import { required, maxLength, parsePhoneNumber } from '../../validation/rules.js';
import './AppForm.css';
import $ from 'jquery';

const fieldValidations = [
  ruleRunner("title", "Title", required, maxLength(100)),
  ruleRunner("text", "Text", maxLength(300)),
  ruleRunner("phoneNumber", "Phone number", required, parsePhoneNumber)
];

const advert =  {
                  title: '',
                  text: '',
                  phoneNumber: '',
                  town: '',
                  img: ''
                };

class AppForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrors: false,
      validationErrors: { }
    }
    this.handleFieldChanged = this.handleFieldChanged.bind(this);    
    this.submit = this.submit.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.previewFile = this.previewFile.bind(this);
  }

  componentWillMount() {
    // Run validations on initial state
    this.setState({validationErrors: run(this.state, fieldValidations)});
  }

  componentDidMount() {
    document.getElementById("town").value = '';
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  handleFieldChanged(field) {
    return (e) => {
      // update() is provided by React Immutability Helpers
      // https://facebook.github.io/react/docs/update.html
      let newState = update(this.state, {
        [field]: {$set: e.target.value}
      });
      newState.validationErrors = run(newState, fieldValidations);
      this.setState(newState);
    };
  }

  submit(e) {
    e.preventDefault();
    this.setState({showErrors: true});
    if($.isEmptyObject(this.state.validationErrors) === false) return null;
    // After checking get input values, send object to answers array
    for (let prop in advert) {
      let elem = document.getElementById(prop);
      advert[prop] = elem.value;
      elem.value = '';
    }
    advert.img = 'data:image/png;base64,' + btoa(document.querySelector('.preview').getAttribute('src'));
    this.props.updateList(advert);
  }

  previewFile() {
    var preview = document.querySelector('.preview');
    var file    = document.querySelector('.form__file-input').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.submit}>
        <TextInput type="text"
                   id="title"
                   label="Title*"
                   placeholder="New advert"
                   showError={this.state.showErrors}
                   errorText={this.errorFor("title")}
                   onFieldChanged={this.handleFieldChanged("title")} />
        <Textarea id="text"
                  rows="10" 
                  cols="45" 
                  label="Text"
                  placeholder="Description"
                  showError={this.state.showErrors}
                  errorText={this.errorFor("text")}
                  onFieldChanged={this.handleFieldChanged("text")} />
        <TextInput type="text"
                   id="phoneNumber"
                   label="Phone number*"
                   placeholder="+7(910)999-33-00"
                   showError={this.state.showErrors}
                   errorText={this.errorFor("phoneNumber")}
                   onFieldChanged={this.handleFieldChanged("phoneNumber")} />
        <Select id="town"
                label="Town"
                showError={this.state.showErrors}
                errorText={this.errorFor("town")}
                onFieldChanged={this.handleFieldChanged("town")} />

        <div className="form__file-input-wrapper">
          <label className="form__label" htmlFor="img">Advert image</label>
          <input className="form__file-input"
                 type="file"
                 onChange={this.previewFile}
                 id="img"
                 name="img"
                 accept="image/jpeg,image/png,image/gif" />
         <img className="preview" src="" height="200" />
        </div>
        <div className="form__btn">
          <button className="form__submit" type="submit">Submit Advert</button>
        </div>
      </form>
    );
  }
}

export default AppForm;