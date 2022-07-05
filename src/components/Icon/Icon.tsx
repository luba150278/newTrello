import React, { useMemo } from 'react';
import { IconContext } from 'react-icons/lib';
// import styles from "./Icon.module.css";

interface IProps {
  iconChild: JSX.Element;
  styles: { color?: string; className: string; size: string };
}

function Icon({ iconChild, styles }: IProps): JSX.Element {
  const props = useMemo(() => styles, [styles]);
  return <IconContext.Provider value={props}>{iconChild}</IconContext.Provider>;
}

export default Icon;
