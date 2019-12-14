import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import 'moment/locale/zh-cn';
import './index.css';
import store from './store'
import App from './App';
moment.locale('zh-cn');

 
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));
