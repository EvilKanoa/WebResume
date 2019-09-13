import React from 'react';

const Body = ({ paragraphs = [] }) => (
    <div className="ltr-body">
        { paragraphs.map(
            (value, i) => <p key={i}>{value || ''}</p>
        ) }
    </div>
);

export default Body;
