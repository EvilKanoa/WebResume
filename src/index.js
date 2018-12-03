import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import {WrappedApp, App} from 'components/CollaborationWrapper';
import store from 'core/store';

import 'index.scss';

window.getState = store.getState;
window.getStore = () => store;

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/:collabId" component={WrappedApp}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
