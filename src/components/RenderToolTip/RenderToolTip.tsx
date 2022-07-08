import React from 'react';
import { Popover, PopoverBody } from 'react-bootstrap';

function RenderTooltip(text: string): JSX.Element {
  return (
    <Popover className="popover-info">
      <PopoverBody>{text}</PopoverBody>
    </Popover>
  );
}

export default RenderTooltip;
