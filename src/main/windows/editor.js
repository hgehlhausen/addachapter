import { ipcMain as ipc, screen, BrowserWindow, Tray } from 'electron';
import path from 'path';
import url from 'url';
import marked from '../parser/classed-markdown';
import Window from './window';

import PreviewWindow from './preview';

export default class EditorWindow extends Window {
  constructor() {
    super(['editor', 'index.html'], {
      title: 'Add a Chapter',
      width: Math.max(screen.width, 600),
      height: Math.max(screen.height, 850),
    });
    this.attach();
  }
  attach() {
    ipc.on('edit:update', ({ sender }, value) => {
      global.data.raw = value;
    });
    ipc.on('edit:preview', () => {
      const preview = new PreviewWindow(this.window);
      global.data.html = marked(global.data.raw);
      preview.open();
    });
  }
  open() {
    const {
      icon,
      webPreferences,
      viewPathArray,
      ...overrides
    } = this;

    const iconPath = path.resolve(path.join(__dirname, '..', icon));
    // const iconFile = new Tray(iconPath);

    this.window = new BrowserWindow({
      show: false,
      webPreferences,
      // icon: iconPath,
      ...overrides
    });
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    const view = url.format({
      protocol: 'file:',
      slashes: true,
      pathname: path.resolve(path.join(__dirname, '..', ...viewPathArray)),
    });
    this.window.loadURL(view);

    this.window.on('resize', ({ sender }) => {
      sender.send('edit:resize');
    });
    return this.window;
  }
}