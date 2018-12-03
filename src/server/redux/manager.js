const redux = require('redux');
const reducer = require('./serverReducer');
const uniqid = require('uniqid');

const stores = {};
let db;
const cached = () => db.collection('web-resume-cache');

const use = (mongoClient) => db = mongoClient.db();

const saveStore = async (id, store) => {
    await cached().updateOne(
        { key: id },
        { $set: { value: store.getState() } },
        { upsert: true }
    );
};

const middleware = (id) => (store) => (next) => (action) => {
    const result = next(action);
    saveStore(id, store).catch((err) => console.error(err));
    return result;
};

const id = uniqid;

const getStore = async (id, initialState) => {
    // check for cached stores
    if (id && !stores[id]) {
        const result = await cached().findOne({ key: id });
        if (result && result.value) {
            initialState = result.value;
        }
    }

    // create new store
    if (!stores[id]) {
        id = id || uniqid();

        stores[id] = redux.createStore(
            reducer,
            initialState,
            redux.applyMiddleware(middleware(id))
        );
    }

    return stores[id];
};

module.exports = {
    use,
    id,
    getStore
};
