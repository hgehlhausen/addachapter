import setupEvents from '../../installer-scripts/squirrel-events';

import {
  app,
  Menu,
} from 'electron';

import editorMenu from './menu';
import EditorWindow from './editor';

if (setupEvents.handleSquirrelEvent()) {
  return;
}


global.windows = new Proxy({}, {
  set(target, prop, value) {
    if (!Reflect.has(target, prop) || target[prop] !== value) {
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
      if (prop === 'raw' && target[prop] !== value) {
        global.windows.editor.webContents.send('edit:import', value);
      }
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
