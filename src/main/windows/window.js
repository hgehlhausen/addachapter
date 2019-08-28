import { BrowserWindow, Tray } from 'electron';
import url from 'url';
import path from 'path';

import appIcon from '../../common/icon.png';

export default class Window {
  constructor(viewPathArray, overrides = {}) {
    this.icon = appIcon;
    this.webPreferences = {
      nodeIntegration: true,
    };
    Object.assign(this, overrides);
    this.viewPathArray = viewPathArray;
  }
  open() {
    const {
      icon,
      webPreferences,
      viewPathArray,
      ...overrides
    } = this;

    try {
      const iconPath = path.resolve(path.join(__dirname, '..', icon));
      const iconFile = new Tray(iconPath);

      this.window = new BrowserWindow({
        show: false,
        webPreferences,
        icon: iconPath,
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
    } catch (err) {
      this.console.log('Error', err);
    }
    return this.window;
  }
}