import React from 'react';
import set from 'lodash.set';
import {createSelector} from 'reselect';
import {renderToStaticMarkup} from 'react-dom/server'

import Resume from 'components/resume/Resume';

const defaultResume = `{"data":{"name":"The Doctor","title":"Time Lord","contact":[{"icon":"fas fa-at","link":"mailto:doctor@tardis.time","label":"doctor@tardis.time"},{"icon":"fas fa-phone","link":"tel:+1234567890","label":"(123) 456-7890"}],"details":[{"type":"summary","label":"Profile","summary":"Looking to run from all sorts of trouble."},{"type":"skills","skillsets":[{"label":"Languages","skills":"English, French, Gallifreyan"}]},{"type":"details","label":"Interests","items":[{"title":"Traveling","description":"All over the universe"}]}],"events":[{"label":"Experience","icon":"fas fa-briefcase","items":[{"title":"Space Pilot","subtitle":"Milky way","date":"May 2048 BC .. Dec 6000 AC","description":"Went for a wild ride.","details":["Lots of different places"]}]}]}}`;

const initialState = {
    resume: JSON.parse(defaultResume),
    render: '',
    printMode: false,
    modal: undefined
};

// selectors
export const getResumeData = (state) => state.resume;
export const getResumeJSON = createSelector(
    [getResumeData],
    (resume) => JSON.stringify(resume, null, 2)
);
export const getRender = (state) => state.render;
export const getPrintMode = (state) => state.printMode;
export const getModalElement = (state) => state.modal;

// action-creators
export const setResume = (data) => ({
    type: 'SET_RESUME',
    remote: true,
    data
});
export const setResumeData = (path, data) => ({
    type: 'SET_RESUME_DATA',
    remote: true,
    path,
    data
});
export const renderResume = () => async (dispatch, getState) => {
    const input = getResumeData(getState());
    const data = await renderToStaticMarkup(
        <Resume data={input.data}/>
    );

    dispatch({
        type: 'SET_RENDER_RESULT',
        data
    });

    return data;
};
export const setPrintMode = (enabled) => ({
    type: 'SET_PRINT_MODE',
    data: enabled
});
export const blipPrintMode = (delayMs = 100, cb) => (dispatch) => {
    dispatch(setPrintMode(true));
    setTimeout(() => {
        cb();
        dispatch(setPrintMode(false));
    }, delayMs);
};
export const showModal = (modalElement) => ({
    type: 'SHOW_MODAL',
    data: modalElement
});
export const hideModal = () => ({
    type: 'HIDE_MODAL'
});

// reducer
export default (state = initialState, { type, ...action }) => {
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
