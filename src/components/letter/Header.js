import React from 'react';

const Header = ({
    name = '',
    email = '',
    phone = '',
    phoneLink = '',
    address1 = '',
    address2 = '',
    addressLink = ''
}) => (
    <header className="ltr-header">
        <section className="ltr-name">
            <div className="ltr-name-main">
                { name.indexOf(' ') === -1
                    ? name
                    : name.substring(0, name.lastIndexOf(' ')) + ' '
                }
                { name.indexOf(' ') !== -1 &&
                    <span className="ltr-name-end">
                        { name.substring(name.lastIndexOf(' ') + 1) }
                    </span>
                }
            </div>

            <div className="ltr-name-detail">
                Cover <span className="ltr-name-end">Letter</span>
            </div>
        </section>

        <address className="ltr-contact">
            { email.length > 0 &&
                <a href={`mailto:${email}`}><i className="fas fa-at"></i> {email}</a>
            }
            { phone.length > 0 &&
                <a href={phoneLink}><i className="fas fa-phone"></i> {phone}</a>
            }
            { address1.length > 0 &&
                <a href={addressLink}><i className="fas fa-map-marked"></i> {address1}</a>
            }
            { address2.length > 0 &&
                <a
                    href={addressLink}
                    style={{
                        marginLeft: '6.5mm',
                        marginTop: '-2mm'
                }}>&nbsp;{address2}</a>
            }
        </address>
    </header>
);

export default Header;
