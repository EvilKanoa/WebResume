import React from 'react';

import ResumeHeader from 'components/resume/Header';
import ResumeDetails from 'components/resume/Details';
import ResumeEvents from 'components/resume/Events';
import LetterHeader from 'components/letter/Header';
import LetterBody from 'components/letter/Body';

import 'templates/default-res.css';
import 'templates/default-ltr.css';

const Resume = ({ type, data = {} }) => (
    type === "ltr"
        ? (
            <div className="ltr">
                <LetterHeader
                    name={data.name || ''}
                    email={data.email || ''}
                    phone={data.phone || ''}
                    phoneLink={data.phoneLink || ''}
                    address1={data.address1 || ''}
                    address2={data.address2 || ''}
                    addressLink={data.addressLink || ''}
                />
                <LetterBody
                    paragraphs={data.body}
                />
            </div>
        ) : (
            <div className="res">
                <ResumeHeader
                    name={data.name || ''}
                    title={data.title || ''}
                    contact={data.contact}
                />
                <ResumeDetails
                    details={data.details}
                />
                <ResumeEvents
                    events={data.events}
                />
            </div>
        )
);

export default Resume;
