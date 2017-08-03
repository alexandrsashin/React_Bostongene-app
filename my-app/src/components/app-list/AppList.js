import React, { Component } from 'react';
import picture from '../../picture.png';
import './AppList.css';
import $ from 'jquery';

class AppList extends Component {
  constructor() {
    super();
    this.remove = this.remove.bind(this);
  }
  remove(elem) {
    let list = $(elem.target).closest('.advert-list').find('.advert-list__item');
    let item = $(elem.target).closest('.advert-list__item');
    let index = list.index(item);
    this.props.remove(index);
  }
  render() {
    let items = this.props.adverts.map((elem, i) => 
          <li className="advert-list__item" key={i}>
            <h2 className="advert-list__item-title">{elem.title}</h2>
            <div className="flex-container">
              <div className="flex-container__item flex-container__item_content">
                <p className="advert-list__item-content">{elem.text}</p>
                <p className="advert-list__item-phone">Phone: {elem.phoneNumber}</p>
                <p className="advert-list__item-town">Town: {elem.town ? elem.town : 'no information'}</p>
                <button className="btn" onClick={this.remove}>Delete</button>
              </div>
              <div className="flex-container__item">
                <img className="advert-list__item-img" 
                     src={elem.img ? elem.img : picture} 
                     alt="advert illustration" />
              </div>
            </div>
          </li>)
    return (
      <ul className="advert-list">
        {items}
      </ul>
    );
  }
}

export default AppList;
