import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import AppForm from '../app-form/AppForm';
import AppList from '../app-list/AppList';

class App extends Component {
  constructor(props) {
    super();
    this.state = { adverts: props.adverts.reverse() };
    this.updateList = this.updateList.bind(this);
    this.removeAdvert = this.removeAdvert.bind(this);
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
  render() {
    return (
      <div className="container">
        <header className="header">
          <img className="header__img" src={logo} alt="React logo" />
          <h1 className="header__title">Advert app on React</h1>
        </header>
        <div className="main-content">
          <AppForm updateList={this.updateList} />
          <AppList adverts={this.state.adverts} remove={this.removeAdvert} />
        </div>
      </div>
    );
  }
}

export default App;
