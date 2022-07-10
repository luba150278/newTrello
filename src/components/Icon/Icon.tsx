/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import { IconContext } from 'react-icons/lib';
import RenderToolTip from '../RenderToolTip/RenderToolTip';
import './icon.css';

interface IProps {
  iconChild: JSX.Element;
  styles: { color?: string; className: string; size: string; title?: string };
  isToolTip?: boolean;
  toolTipText?: string;
  toolTipPlace?: Placement;
}

function Icon({
  iconChild,
  styles,
  isToolTip = false,
  toolTipText = '',
  toolTipPlace = 'bottom',
}: IProps): JSX.Element {
  const props = useMemo(() => styles, []);

  if (!isToolTip) {
    return <IconContext.Provider value={props}>{iconChild}</IconContext.Provider>;
  }
  return (
    <OverlayTrigger placement={toolTipPlace} delay={{ show: 250, hide: 400 }} overlay={RenderToolTip(toolTipText)}>
      <div>
        <IconContext.Provider value={props}>{iconChild}</IconContext.Provider>
      </div>
    </OverlayTrigger>
  );
}

export default Icon;
