// import view from './index.html';
let path;
let editor;
let app;
let preview;
let debounceId;
let ipc;
let electron;

import css from './editor.css';

const whenReady = initialize => () => {
    if (document.readyState === 'complete') {
        initialize();
    }
}

const generatePreview = () => {
    ipc.send('edit:preview');
}

const start = () => {
    const cssLink = document.createElement('link');
    cssLink.type = "text/css";
    cssLink.rel = "stylesheet";
    cssLink.src = css;
    document.querySelector('head').appendChild(cssLink);


    path = require('path');
    editor = document.getElementById('editor');
    editor.addEventListener('input', ({ target: { value } }) => {
        if (debounceId) {
            clearTimeout(debounceId);
        }
        debounceId = setTimeout((value) => {
            ipc.send('edit:update', value);
        }, 1000, value);
    });

    document.querySelector('#generatePreview').onclick = generatePreview;

    electron = require('electron');
    ipc = electron.ipcRenderer;

    ipc.on('edit:import', (event, markdown) => {
        console.log(event, markdown);
        editor.value = markdown;
    });
    ipc.on('edit:importImage', (event, imageTag) => {
        console.log(event, imageTag);
        if (editor.selectionStart || editor.selectionStart == '0') {
            var startPos = editor.selectionStart;
            var endPos = editor.selectionEnd;
            editor.value = editor.value.substring(0, startPos)
                + imageTag
                + editor.value.substring(endPos, editor.value.length);
        } else {
            editor.value += imageTag;
        }
    });

    ipc.send('edit:ready', Date.now());
};

document.onreadystatechange = whenReady(start);