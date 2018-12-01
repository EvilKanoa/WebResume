const initialState = {
    resume: {}
};

// selectors
export const getResumeData = (state) => state.resume;

// action-creators

// reducer
export default (state = initialState, { type, ...action }) => {
    switch (type) {
        default: return {
            ...state
        };
    }
};
