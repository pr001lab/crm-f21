import { ComponentProps, ReactNode } from 'react';

export interface HeaderProps extends ComponentProps<'header'> {
  children: ReactNode;
}
