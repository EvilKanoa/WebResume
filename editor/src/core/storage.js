class Storage {
    constructor(prefix) {
        this.prefix = prefix + '-'; // TODO: switch to '_'
        this.engine = localStorage;
    }

    // generic methods

    makeKey = (key) => `${this.prefix}${key}`;

    serialize = (data) => JSON.stringify(data);

    deserialize = (data) => JSON.parse(data);

    set = (key, value) => {
        if (!key) return false;

        try {
            this.engine.setItem(this.makeKey(key), this.serialize(value));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    get = (key) => {
        if (!key) return undefined;
        try {
            return this.deserialize(this.engine.getItem(this.makeKey(key)));
        } catch(err) {
            console.error(err);
            return undefined;
        }
    };

    saveFile = (filename, data) => this.set(
        'saved_files',
        [
            ...(this.get('saved_files') || [])
                .filter(({ name }) => name !== filename),
            {
                name: filename,
                data,
                modified: new Date().toISOString()
            }
        ]
    );

    loadFile = (filename) => (this.get('saved_files') || [])
        .find(({ name }) => name === filename);

    getSavedFiles = () => (this.get('saved_files') || [])
        .filter(({ deleted }) => !deleted)
        .map(({ name }) => name);

    deleteFile = (filename) => {
        const file = this.loadFile(filename);
        if (file) {
            this.set(
                'saved_files',
                [
                    ...(this.get('saved_files') || [])
                        .filter(({ name }) => name !== filename),
                    {
                        ...file,
                        deleted: true,
                        modified: new Date().toISOString()
                    }
                ]
            )
        }
    }
}

const instance = new Storage('WebResume_v1');

const getMiddleware = (prop) => (store) => (next) => (action) => {
    const prev = store.getState()[prop];
    const result = next(action);
    const value = store.getState()[prop];

    if (prev !== value) {
        instance.set(prop, value);
    }

    return result;
};

export {getMiddleware, instance as default};
