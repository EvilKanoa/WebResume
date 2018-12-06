import React from 'react';
import OptionalHTML from "./OptionalHTML";

const flatten = (arrays) => [].concat.apply([], arrays);

const Events = ({ events = [], update }) => (
    <div className="res-pane-events">
        { events.map(
            ({ label = '', icon = '', items = [] }, idx) => (
                <section className="res-content" key={label + idx}>
                    <i className={'res-content-icon ' + icon}></i>
                    <div className="res-content-header">
                        <OptionalHTML value={label}/>
                    </div>

                    { flatten(items
                        .map(
                            ({ title = '', subtitle = '', date = '', description = '', details = [] }, idx) => (
                                <div className="res-content-item" key={title + subtitle + idx}>
                                    <div className="res-content-item-header">
                                        <span className="res-content-item-header-position">
                                            <OptionalHTML value={title}/>
                                        </span>
                                        <span className="res-content-item-header-location">
                                            <OptionalHTML value={subtitle}/>
                                        </span>
                                        <span className="res-content-item-header-date">
                                            <OptionalHTML value={date}/>
                                        </span>
                                    </div>
                                    <OptionalHTML value={description}/>
                                    { details.length > 0 &&
                                        <ul>
                                            { details.map((detail) => (
                                                <li key={detail}>
                                                    <OptionalHTML value={detail}/>
                                                </li>
                                            )) }
                                        </ul>
                                    }
                                </div>
                            )
                        )
                        .map((content, idx) => [
                            <div className="res-content-item-dot" key={'dot' + idx}><span></span></div>,
                            content
                        ])
                    ) }
                </section>
            )
        ) }
    </div>
);

export default Events;
