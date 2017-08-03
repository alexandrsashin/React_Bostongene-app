import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

let advertList = [{
	title: "The first advert",
	text: "You can add or delete adverts",
	phoneNumber: "+7(999)722-24-31",
	town: "Nikologory",
	img: ""
},{
	title: "The second advert",
	text: "Form validation works",
	phoneNumber: "+7(999)344-46-27",
	town: "",
	img: ""
}];

let advertStorage = localStorage.getItem("advertList"); 
if (advertStorage) {
	advertList = JSON.parse(advertStorage);
}

ReactDOM.render(
	<App adverts={advertList} />, 
	document.getElementById('root')
);
registerServiceWorker();
