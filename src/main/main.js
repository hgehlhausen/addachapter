import {
  app,
  Menu,
} from 'electron';

import windowsIcon from '../common/icon.ico';

import editorMenu from './menu';
import EditorWindow from './windows/editor';

global.windows = new Proxy({}, {
  set(target, prop, value) {
    if ((!Reflect.has(target, prop) || (Relect.get(target, prop) !== value) && value)) {
      value.on('closed', () => {
        delete target[prop];
      });
    }
    return Reflect.set(target, prop, value);
  }
});

global.data = new Proxy({
  raw: '',
  html: '',
}, {
    set(target, prop, value) {
      return Reflect.set(target, prop, value);
    },
    get(target, prop) {
      return Reflect.get(target, prop);
    }
  });

app.on('ready', () => {
  const editor = new EditorWindow();
  global.windows.editor = editor.open();
  const menu = Menu.buildFromTemplate(editorMenu);
  Menu.setApplicationMenu(menu);
});
