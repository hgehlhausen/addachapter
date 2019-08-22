import { BrowserWindow, ipcMain } from 'electron';
import url from 'url';
import path from 'path';
import marked from './parser/classed-markdown';

import appIcon from '../common/icon.png';
import PreviewWindow from './preview';

export default class EditorWindow {
  constructor(ipc = ipcMain, icon = appIcon) {
    this.icon = icon;
    this.webPreferences = {
      nodeIntegration: true,
      // webSecurity: false,
    };
    this.title = '';
    this.attach(ipc);
  }
  attach(ipc) {
    ipc.on('edit:ready', ({ sender }, timestamp) => {
      console.log('ready');
      sender.send('edit:import', global.data.raw);

    });
    ipc.on('edit:update', ({ sender }, value) => {
      global.data.raw = value;
    });
    ipc.on('edit:preview', () => {
      const preview = new PreviewWindow();
      global.data.html = marked(global.data.raw);
      preview.open();
    });
  }
  open() {
    const {
      webPreferences,
      icon,
      title,
    } = this;
    const window = new BrowserWindow({
      webPreferences,
      icon,
      title,
    });
    const view = url.format({
      protocol: 'file:',
      slashes: true,
      pathname: path.resolve(path.join(__dirname, '..', 'editor', 'index.html')),
    });
    window.loadURL(view);
    this.window = window;
    return this.window;
  }
}