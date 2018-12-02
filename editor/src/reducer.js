import React from 'react';
import set from 'lodash.set';
import {createSelector} from 'reselect';
import {renderToStaticMarkup} from 'react-dom/server'

import storage from 'core/storage';
import Resume from 'components/resume/Resume';

const initialState = {
    resume: storage.get('resume') || {},
    render: '',
    printMode: false
};

// selectors
export const getResumeData = (state) => state.resume;
export const getResumeJSON = createSelector(
    [getResumeData],
    (resume) => JSON.stringify(resume, null, 2)
);
export const getRender = (state) => state.render;
export const getPrintMode = (state) => state.printMode;

// action-creators
export const setResume = (data) => ({
    type: 'SET_RESUME',
    data
});
export const setResumeData = (path, data) => ({
    type: 'SET_RESUME_DATA',
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

// reducer
export default (state = initialState, { type, ...action }) => {
    switch (type) {
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

        default: return {
            ...state
        };
    }
};
