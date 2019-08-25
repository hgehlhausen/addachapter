import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { ipcRenderer as ipc } from 'electron';

import { EVENTS as EVENT } from '../../constants.js';

export default function Controls() {
  return <ButtonToolbar>
    <ButtonGroup>
      <Button onClick={() => ipc.send('edit:preview')}>P</Button>
    </ButtonGroup>
  </ButtonToolbar>
}

