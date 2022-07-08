import { LegacyRef } from 'react';

export interface IInput {
  title: string;
  ph: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  onKeyUp?: () => void;
  onBlur?: () => void;
  cln?: string;
  clni?: string;
  ref: LegacyRef<HTMLInputElement> | undefined;
}
