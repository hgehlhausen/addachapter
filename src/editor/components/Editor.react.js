import React from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls/Controls.react';
import MonacoEditor from './MonacoEditor.react';

export default function Editor(props) {
  return <div>
    <div><Controls /></div>
    <div><MonacoEditor height="600px" /></div>
  </div>
}

Editor.propTypes = {
  id: PropTypes.string,
};
