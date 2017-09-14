import React, { Component } from "react";
import { reduxForm } from "redux-form";
import logo from "../../logo.svg";
import "./App.css";
import AppSelect from "../app-select/AppSelect";
import AppSortable from "../app-sortable/AppSortable";
import AppForm from "../app-form/AppForm";
import AppList from "../app-list/AppList";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      adverts: props.adverts.reverse(),
      options: ["1"],
      selectedOptions: ["a", "b", "c"],
      number: 3
    };
    this.updateList = this.updateList.bind(this);
    this.removeAdvert = this.removeAdvert.bind(this);

    /* component MultiSelect */
    this.setOptions = this.setOptions.bind(this);
  }
  updateList(obj) {
    let updatedAdverts = this.state.adverts;
    updatedAdverts.unshift(obj);
    this.setState({ adverts: updatedAdverts });
    this.updateLocalStorage(updatedAdverts);
  }
  removeAdvert(index) {
    let updatedAdverts = this.state.adverts;
    updatedAdverts.splice(index, 1);
    this.setState({ adverts: updatedAdverts });
    this.updateLocalStorage(updatedAdverts);
  }
  updateLocalStorage(updatedAdverts) {
    localStorage.setItem("advertList", JSON.stringify(updatedAdverts));
  }
  setOptions(setOptions) {
    console.log(setOptions);
  }
  render() {
    return (
      <div className="container">
        <header className="header">
          <img className="header__img" src={logo} alt="React logo" />
          <h1 className="header__title">Advert app on React</h1>
        </header>

        <AppSelect
          placeholder="Add synonyms"
          options={this.state.options}
          selectedOptions={this.state.selectedOptions}
          onSetOptions={this.setOptions}
        />
        <button
          onClick={() => {
            this.setState({ options: [...this.state.options, 2] });
          }}
        >
          Change State
        </button>
        <AppSortable />
        <div className="main-content">
          <AppForm updateList={this.updateList} />
          <AppList adverts={this.state.adverts} remove={this.removeAdvert} />
        </div>
      </div>
    );
  }
}

export default App;
