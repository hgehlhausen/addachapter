import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { ipcRenderer as ipc } from 'electron';

import constants from '../../constants.js';
// import icons from '../../../assets/icon.css';
import { faTable, faUser, faSearch, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

export default function Controls() {
  return <ButtonToolbar>
    <ButtonGroup>
      <Button onClick={() => ipc.send('edit:reset')}><Icon icon={faFile} /></Button>
      <Button onClick={() => ipc.send('edit:preview')}><Icon icon={faSearch} /></Button>
      <Button onClick={() => ipc.send('edit:insertTable')}><Icon icon={faTable} /></Button>
      <Button onClick={() => ipc.send('edit:insertCreature')}><Icon icon={faUser} /></Button>
    </ButtonGroup>
  </ButtonToolbar>
}

