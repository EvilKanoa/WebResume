import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {getMiddleware} from 'core/storage';
import {middleware as sockets} from 'core/sockets';
import reducer from 'reducer';

let middleware = applyMiddleware(thunk, getMiddleware('resume'), sockets);
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, middleware);

export default store;
