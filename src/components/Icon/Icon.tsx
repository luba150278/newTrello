import React, { useMemo } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import RenderToolTip from '../RenderToolTip/RenderToolTip';
import './icon.css';

interface IProps {
  iconChild: JSX.Element;
  styles: { color?: string; className: string; size: string; title?: string };
  isToolTip: boolean;
  toolTipText: string;
}

function Icon({ iconChild, styles, isToolTip, toolTipText }: IProps): JSX.Element {
  const propsS = useMemo(() => styles, []);

  if (!isToolTip) {
    return <IconContext.Provider value={propsS}>{iconChild}</IconContext.Provider>;
  }

  return (
    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={RenderToolTip(toolTipText)}>
      <div>
        <IconContext.Provider value={propsS}>{iconChild}</IconContext.Provider>
      </div>
    </OverlayTrigger>
  );
}

export default Icon;
