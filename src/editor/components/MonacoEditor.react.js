import React from 'react';
import PropTypes from 'prop-types';
import Monaco from 'react-monaco-editor';

import { ipcRenderer as ipc, TouchBarColorPicker } from 'electron';

const EDITOR_PROPS = {
  width: 'calc(100vw - 2rem)',
  height: '90vh',
  theme: 'vs-dark',
  readOnly: false,
  language: 'markdown',
};

const importMarkdown = editor => (event, markdown) => {
  editor.setValue(markdown);
}

const insertAtCursor = (editor, monaco) => (ipcEvent, imageTag) => {
  editor.getModel().applyEdits([
    {
      range: monaco.Range.fromPositions(editor.getPosition()),
      text: imageTag,
    }])
}

export default function MonacoEditor(props) {
  const { value } = props;
  return <Monaco
    {...EDITOR_PROPS}
    value={value}
    onChange={(newValue, e) => {
      ipc.send('edit:update', newValue);
    }}
    editorDidMount={(editor, monaco) => {
      ipc.on('edit:import', importMarkdown(editor));
      ipc.on('edit:importImage', insertAtCursor(editor, monaco));
    }}
  />;
}