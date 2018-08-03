import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, Provider} from 'react-redux';
import reducer from '../store/reducer';


const store = createStore(reducer);

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>app</Provider>, document.getElementById('root'));
registerServiceWorker();
