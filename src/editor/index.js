import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/Editor.react.js';

let path;
let editor;
let app;
let preview;
let debounceId;
let ipc;
let electron;

import css from './editor.css'; // 

const whenReady = initialize => () => {
    if (document.readyState === 'complete') {
        initialize();
    }
}

const generatePreview = () => {
    ipc.send('edit:preview');
}

const start = () => {
    const cssImported = css; // ensure CSS imported by webpack
    // const cssLink = document.createElement('link');
    // cssLink.type = "text/css";
    // cssLink.rel = "stylesheet";
    // cssLink.src = css;
    // document.querySelector('head').appendChild(cssLink);

    const wrapper = document.querySelector('body');

    if (wrapper) {
        ReactDOM.render(<Editor />, wrapper);
    }

    path = require('path'); // specifically require to pull from main

    electron = require('electron');
    ipc = electron.ipcRenderer;

    // ipc.on('edit:import', (event, markdown) => {
    //     console.log(event, markdown);
    //     editor.value = markdown;
    // });
    // ipc.on('edit:importImage', (event, imageTag) => {
    //     console.log(event, imageTag);
    //     if (editor.selectionStart || editor.selectionStart == '0') {
    //         var startPos = editor.selectionStart;
    //         var endPos = editor.selectionEnd;
    //         editor.value = editor.value.substring(0, startPos)
    //             + imageTag
    //             + editor.value.substring(endPos, editor.value.length);
    //     } else {
    //         editor.value += imageTag;
    //     }
    // });

    ipc.send('edit:ready', Date.now());
};

document.onreadystatechange = whenReady(start);