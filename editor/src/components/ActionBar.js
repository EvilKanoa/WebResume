import React, {PureComponent} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getRender, renderResume} from 'reducer';

@connect(
    (state) => ({
        render: getRender(state)
    }),
    (dispatch) => bindActionCreators({
        renderResume
    }, dispatch)
)
class ActionBar extends PureComponent {
    renderMarkup = async (e) => {
        e.preventDefault();

        const html = await this.props.renderResume();
        const element = document.createElement('a');

        element.href = URL.createObjectURL(new Blob([html]), { type: 'text/plain' });
        element.download = 'resume.html';
        element.click();
    };

    render() {
        return (
            <div id="action-bar">
                <div className="button" onClick={this.renderMarkup}>
                    Render Markup
                </div>
            </div>
        )
    }
}

export default ActionBar;
