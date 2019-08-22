
import { BrowserWindow, ipcMain } from 'electron';
import { exportFileDialog } from './files/dialog';
import path from 'path';
import url from 'url';

// import view from '../preview/preview.html';
import appIcon from '../common/icon.png';

export default class PreviewWindow {
  constructor(ipc = ipcMain) {
    this.ipc = ipc;
    this.title = 'Preview';
    this.webPreferences = {
      nodeIntegration: true,
    };
    this.width = 850;
    this.height = 900;
    this.icon = appIcon;
    this.modal = true;
    this.attach(this.ipc);
  }
  attach(ipc) {
    ipc.on('preview:ready', ({ sender }) => {
      sender.send('preview:rendered', global.data.html);
    });
    ipc.on('preview:export:pdf', ({ sender }) => {
      const window = BrowserWindow.fromWebContents(sender);

      window.webContents.printToPDF({}, async (e, data) => {
        if (e) { console.log(e); return; }

        try {
          const errCode = await exportFileDialog(data);
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