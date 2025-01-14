import { ComponentProps, ReactNode } from 'react';

export interface MainProps extends ComponentProps<'main'> {
  children: ReactNode;
}
