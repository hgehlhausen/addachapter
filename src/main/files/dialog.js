import path from 'path';
import { dialog, shell } from 'electron';

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
  const path = await dialog.showSaveDialog({
    title: 'Export File',
    defaultPath: defaultPath(),
  });
  try {
    const result = await writeFile(path, data);
    shell.openItem(path);
  } catch (err) {
    console.log(err);
  }
}

export async function importFileDialog(title, filters, encoding = null) {
  const [fullPath] = await dialog.showOpenDialog({
    title,
    defaultPath: defaultPath(),
    browserWindow: global.windows.editor,
    filters,
  });
  const data = await readFile(fullPath, encoding);
  return {
    fullPath,
    ...path.parse(fullPath),
    data,
  };
}

export async function saveFileDialog(data, title = 'Save As', defPath) {
  const path = await dialog.showSaveDialog({
    title,
    defaultPath: defaultPath(),
  });
  try {
    await writeFile(path, data);
    return 0;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}