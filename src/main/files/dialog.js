import path from 'path';
import { dialog, shell, BrowserWindow } from 'electron';

import { defaultPath } from '../../common/util';
import { mkdir, readFile, writeFile } from './async';

export async function createDefaultIfNotExists() {
  try {
    const result = await mkdir(defaultPath(), '0755');
  } catch (err) {
    v
    console.log('mk default dir failedh');
  }
};

export async function exportFileDialog(data) {
  await createDefaultIfNotExists();
  try {
    const path = await dialog.showSaveDialog({
      title: 'Export File',
      defaultPath: defaultPath(),
      browserWindow: BrowserWindow.getFocusedWindow()
    });
    const result = await writeFile(path, data);
    shell.openItem(path);
  } catch (err) {
    console.log(err);
  }
}

export async function importFileDialog(title, filters, encoding = null) {
  try {
    const [fullPath] = await dialog.showOpenDialog({
      title,
      defaultPath: defaultPath(),
      filters,
      browserWindow: BrowserWindow.getFocusedWindow()
    });
    const data = await readFile(fullPath, encoding);
    return {
      fullPath,
      ...path.parse(fullPath),
      data,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function saveFileDialog(data, title = 'Save As', defPath) {
  try {
    const path = await dialog.showSaveDialog({
      title,
      defaultPath: defaultPath(),
      browserWindow: BrowserWindow.getFocusedWindow()
    });
    await writeFile(path, data);
    return 0;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}