import React from 'react';

import Header from 'components/resume/Header';
import Details from 'components/resume/Details';
import Events from 'components/resume/Events';

import 'templates/default.css';

const getUpdate = (setter) => (path, transform) => ({
    contentEditable: true,
    onInput: (e) => {
        e.preventDefault();
        e.stopPropagation();

        let value = e.target.innerText;
        if (transform) {
            value = transform(value);
        }
        setter(path, value);
    }
});

const Resume = ({ data = {}, update }) => {
    const updater = getUpdate(update);
    return (
        <div className="res">
            <Header
                name={data.name}
                title={data.title}
                contact={data.contact}
                update={updater}
            />
            <Details
                details={data.details}
                update={updater}
            />
            <Events
                events={data.events}
                update={updater}
            />
        </div>
    );
};

export default Resume;
