import React from 'react';

const OptionalHTML = ({ value }) => (
    <span dangerouslySetInnerHTML={{ __html: value }}></span>
);

export default OptionalHTML;
