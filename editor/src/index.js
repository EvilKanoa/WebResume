import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import App from 'components/App';
import store from 'core/store';

import 'index.scss';

window.getState = store.getState;
window.getStore = () => store;

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
