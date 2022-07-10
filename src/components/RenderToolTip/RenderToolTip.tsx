/* eslint-disable no-console */
import React from 'react';
import { Popover, PopoverBody } from 'react-bootstrap';

function RenderTooltip(text: string): JSX.Element {
  return (
    <Popover>
      <PopoverBody>{text}</PopoverBody>
    </Popover>
  );
}

export default RenderTooltip;
