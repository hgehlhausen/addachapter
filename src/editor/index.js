import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/Editor.react.js';

import css from './editor.css';

const whenReady = () => {
    if (document.readyState === 'complete') {
        const cssImported = css; // ensure CSS imported by webpack
        const wrapper = document.getElementById('app');
        if (wrapper) {
            ReactDOM.render(<Editor />, wrapper);
        }
    }
}

document.onreadystatechange = whenReady;