const redux = require('redux');
const reducer = require('./serverReducer');
const uniqid = require('uniqid');

const stores = {};

const createStore = (initialState, id) => {
    if (id && stores[id]) {
        return id;
    } else {
        id = id || uniqid();
        stores[id] = redux.createStore(
            reducer,
            initialState
        );
        return id;
    }
};

const getStore = (id) => {
    return stores[id];
};

const deleteStore = (id) => {
    delete stores[id];
};

const listStores = () => {
    return Object.keys(stores);
};

module.exports = {
    createStore,
    getStore,
    deleteStore,
    listStores
};
