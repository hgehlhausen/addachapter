import { app, dialog, BrowserWindow, } from 'electron';
import url from 'url';
import path from 'path';

import { writeFile } from './files/async';
import { importFileDialog, saveFileDialog } from './files/dialog';
import { defaultPath } from '../common/util';

export default [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Chapter File',
        accelerator: `CmdOrCtrl+O`,
        async click() {
          try {
            const { fullPath, name, data, dir } = await importFileDialog('Open Markdown File', [
              { name: 'Markdown', extensions: ['md', 'MD', 'markdown'] },
              { name: 'All Files', extensions: ['*'] },
            ], 'utf8');
            global.data.raw = data;
            global.preferredDir = dir;
            global.currentFileName = name;
            global.quickSavePath = fullPath;
            BrowserWindow.getFocusedWindow().send('edit:import', data);
          } catch (err) {
            console.log('File Open Error', err);
          }
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        async click() {
          try {
            if (global.quickSavePath) {
              await writeFile(global.quickSavePath, global.data.raw);
              console.log('quick saved!');
              return;
            }
            await saveFileDialog(global.data.raw, global.preferredDir);
          } catch (error) {
            conso.log('Quick Save Error', error);
          }
        }
      },
      {
        label: 'Save As',
        accelerator: `CmdOrCtrl+Shift+S`,
        async click() {
          try {
            await saveFileDialog(global.data.raw, global.preferredDir);
          } catch (err) {
            console.log('Error with Save As', err);
          }
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() { app.quit(); }
      }
    ],
  },
  {
    label: 'Editor',
    submenu: [
      {
        label: 'Import Relative Image',
        accelerator: 'CmdOrCtrl+Shift+I',
        async click(event, focusedWindow) {
          const [pathname] = dialog.showOpenDialog({
            title: 'Import Relative File',
            defaultPath: global.preferredDir || defaultPath(),
            browserWindow: BrowserWindow.getFocusedWindow(),
            filters: [
              { name: 'Portal Network Graphic', extensions: ['png', 'PNG'] },
              { name: 'JPeg', extensions: ['jpg', 'JPG', 'jpeg', 'JPEG'] },
              { name: 'All Files', extensions: ['*'] },
            ]
          });
          const fileUrl = url.format({
            pathname: pathname,
            protocol: 'file:',
            slashes: true,
          });
          const name = path.basename(pathname);
          try {
            const image = `<img name="${name}" src="${fileUrl}" />`
            focusedWindow.webContents.send('edit:importImage', image)
          } catch (err) {
            console.log(err);
          }
        }
      },
      {
        label: 'Import Complete Image',
        accelerator: 'CmdOrCtrl+Alt+Shift+I',
        async click(event, focusedWindow) {
          try {
            const { name, ext, data } = await importFileDialog('Import Image', [
              { name: 'Portal Network Graphic', extensions: ['png', 'PNG'] },
              { name: 'JPeg', extensions: ['jpg', 'JPG', 'jpeg', 'JPEG'] },
              { name: 'All Files', extensions: ['*'] },
            ], 'base64');
            const image = `<img name="${name}" src="data:image/${ext.substr(1)};base64, ${data}" />`
            focusedWindow.webContents.send('edit:importImage', image)
          } catch (err) {
            console.log(err);
          }
        }
      },
      {
        label: 'Dev Tools',
        accelerator: `CmdOrCtrl+Shift+J`,
        click(event, focusedWindow) { focusedWindow.toggleDevTools(); }
      },
      {
        label: 'Reload Page',
        accelerator: `CmdOrCtrl+Shift+R`,
        role: 'reload'
      }
    ]
  }
]