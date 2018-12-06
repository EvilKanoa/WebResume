import React from 'react';
import OptionalHTML from "./OptionalHTML";

const SummaryItem = ({ label = '', summary = '' }) => (
    <section className="res-profile res-flag-justify">
        <span className="res-detail-title">
            <OptionalHTML value={label}/>
        </span>
        <OptionalHTML value={summary}/>
    </section>
);

const SkillsItem = ({ skillsets = []}) => (
    <section className="res-skills">
        { skillsets.map(
            ({ label = '', skills = ''}, idx) => (
                <div className="res-skill-list" key={label + idx}>
                    <span className="res-skill-list-title">
                        <OptionalHTML value={label}/>
                    </span>
                    <span className="res-skill-list-items">
                        <OptionalHTML value={skills}/>
                    </span>
                </div>
            )
        ) }
    </section>
);

const DetailsItem = ({ label = '', items = []}) => (
    <section className="res-interests">
        <span className="res-detail-title">
            { label }
        </span>
        { items.map(
            ({ title = '', description = '' }, idx) => (
                <div className="res-interest-detail" key={title + idx}>
                    <span className="res-interest-detail-title">
                        <OptionalHTML value={title}/>
                    </span>
                    <span className="res-interest-detail-description">
                        <OptionalHTML value={description}/>
                    </span>
                </div>
            )
        ) }
    </section>
);

const Details = ({ details = [], update }) => (
    <div className="res-pane-details">
        { details.map(
            ({ type = '', ...rest }, idx) => {
                switch (type.toLowerCase()) {
                    case 'summary': return <SummaryItem key={idx} {...rest}/>;
                    case 'skills': return <SkillsItem key={idx} {...rest}/>;
                    case 'details': return <DetailsItem key={idx} {...rest}/>;
                    default: return null;
                }
            }
        ) }
    </div>
);

export default Details;
