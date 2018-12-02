import React, {Component} from 'react';

import storage from 'core/storage';

import './FileList.scss';

class FileList extends Component {
    render() {
        const { selected, onChange } = this.props;
        const filenames = storage.getSavedFiles().reverse();

        const toDateString = (filename) =>
            new Date(storage.loadFile(filename).modified).toLocaleDateString();

        return (
            <div className="file-list">
                { filenames.map((filename) => (
                    <span
                        className={'file-list-item-container ' + (selected === filename ? 'selected' : '')}
                        key={filename}
                    >
                        <div className="file-list-item"
                             onClick={(e) => {
                                 e.preventDefault();
                                 onChange(filename);
                             }}
                        >
                            <span className="file-list-item-name">
                                Name: { filename }
                            </span>
                            <span className="file-list-item-date">
                                Modified: { toDateString(filename) }
                            </span>
                            <span
                                className="file-list-item-delete"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    storage.deleteFile(filename);
                                    onChange(filename === selected ? '' : selected);
                                    this.forceUpdate();
                                } }
                            >
                                X
                            </span>
                        </div>
                    </span>
                )) }
            </div>
        );
    }
}

export default FileList;
