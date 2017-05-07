import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dnaVisualizer from './reducers';
import App from './App';

import './main.css';

const store = createStore(dnaVisualizer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
