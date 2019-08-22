import css from './preview.css';

let ipc;
document.onreadystatechange = event => {
  if (document.readyState === 'complete') {
    const cssEl = document.createElement('link');
    cssEl.rel = 'stylesheet';
    cssEl.type = 'text/css';
    cssEl.src = css;

    document.querySelector('head').appendChild(cssEl);

    const {
      ipcRenderer
    } = require('electron');
    ipc = ipcRenderer;
    ipc.on('preview:rendered', (event, html) => {
      document.getElementById('preview').innerHTML = html;
    });
    ipc.send('preview:ready', Date.now());
    const printer = document.getElementById('print');
    printer.addEventListener('click', () => {
      ipc.send('preview:export:pdf');
    });
  }
}