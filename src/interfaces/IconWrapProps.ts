import { IconStyles } from './IconStyles';

export interface IconWrapProps {
  onClick?: () => void;
  iconChild: JSX.Element;
  iconStyles: IconStyles;
  className: string;
}
