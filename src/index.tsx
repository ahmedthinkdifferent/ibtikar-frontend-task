import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <ToastContainer/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
