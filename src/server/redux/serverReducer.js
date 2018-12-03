const set = require('lodash.set');

const defaultResume = `{"data":{"name":"The Doctor","title":"Time Lord","contact":[{"icon":"fas fa-at","link":"mailto:doctor@tardis.time","label":"doctor@tardis.time"},{"icon":"fas fa-phone","link":"tel:+1234567890","label":"(123) 456-7890"}],"details":[{"type":"summary","label":"Profile","summary":"Looking to run from all sorts of trouble."},{"type":"skills","skillsets":[{"label":"Languages","skills":"English, French, Gallifreyan"}]},{"type":"details","label":"Interests","items":[{"title":"Traveling","description":"All over the universe"}]}],"events":[{"label":"Experience","icon":"fas fa-briefcase","items":[{"title":"Space Pilot","subtitle":"Milky way","date":"May 2048 BC .. Dec 6000 AC","description":"Went for a wild ride.","details":["Lots of different places"]}]}]}}`;

const initialState = {
    resume: JSON.parse(defaultResume)
};

module.exports = (state = initialState, { type, ...action }) => {
    switch (type) {
        case 'SET_STATE': return {
            ...state,
            ...action.data
        };

        case 'SET_RESUME': return {
            ...state,
            resume: action.data
        };

        case 'SET_RESUME_DATA': return {
            ...state,
            resume: {
                ...state.resume,
                data: set({ ...state.resume.data }, action.path, action.data)
            }
        };

        case 'SET_RENDER_RESULT': return {
            ...state,
            render: action.data
        };

        case 'SET_PRINT_MODE': return {
            ...state,
            printMode: action.data
        };

        case 'SHOW_MODAL': return {
            ...state,
            modal: action.data
        };

        case 'HIDE_MODAL': return {
            ...state,
            modal: undefined
        };

        default: return {
            ...state
        };
    }
};
