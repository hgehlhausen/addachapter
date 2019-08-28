import { ipcMain as ipc, screen } from 'electron';
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
    this.attach(ipc);
  }
  attach(ipc) {
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
    const window = super.open();
    window.on('resize', ({ sender }) => {
      sender.send('edit:resize');
    });
    return window;
  }
}