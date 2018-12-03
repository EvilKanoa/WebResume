import React from 'react';
import OptionalHTML from 'components/resume/OptionalHTML';

const getNameElement = (main, name) => (
    <div className={main ? 'res-name-main' : 'res-name-detail'}>
        <OptionalHTML value={
            name.indexOf(' ') === -1 ?
                name :
                name.substring(0, name.lastIndexOf(' ')) + ' '
        }/>
        { name.indexOf(' ') !== -1 &&
            <span className="res-name-end">
                <OptionalHTML value={name.substring(name.lastIndexOf(' ') + 1)}/>
            </span>
        }
    </div>
);

const Header = ({ name = '', title = '', contact = [], update }) => (
    <header className="res-header">
        <section className="res-logo">
            { name
                .split(' ')
                .reduce(
                    (logo, part) => part.length > 0 ? logo + part[0] : logo,
                    ''
                )
            }
        </section>

        <section className="res-name">
            { getNameElement(true, name) }
            { getNameElement(false, title) }
        </section>

        <address className="res-contact">
            { contact.map((item) => (
                <a
                    href={item.link}
                    key={item.link}
                >
                    <i className={item.icon}></i> { ' ' + item.label }
                </a>
            )) }
        </address>
    </header>
);

export default Header;
