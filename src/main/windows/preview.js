
import { BrowserWindow, ipcMain as ipc } from 'electron';
import path from 'path';
import url from 'url';

import Window from './window';
import { exportFileDialog } from '../files/dialog';

export default class PreviewWindow extends Window {
  constructor(parent) {
    super(['preview', 'index.html'], {
      title: 'Preview',
      modal: true,
      width: 850,
      height: 900,
      parent,
    });
    this.attach();
  }
  attach() {
    ipc.on('preview:ready', ({ sender }) => {
      sender.send('preview:rendered', global.data.html);
    });
    ipc.on('preview:export:pdf', ({ sender }) => {
      const window = BrowserWindow.fromWebContents(sender);

      window.webContents.printToPDF({}, async (e, data) => {
        if (e) { console.log(e); return; }

        try {
          await exportFileDialog(data);
        } catch (err) {
          console.log(err);
        }
      })
    });
  }
  open() {
    const {
      title,
      webPreferences,
      width,
      height,
      icon,
      modal,
    } = this;
    const window = new BrowserWindow({
      title,
      webPreferences,
      width,
      height,
      icon,
      modal,
    });
    const view = url.format({
      protocol: 'file:',
      slashes: true,
      pathname: path.resolve(path.join(__dirname, '..', 'preview', 'index.html')),
    });
    window.loadURL(view);
    this.window = window;
    return window;
  }
}