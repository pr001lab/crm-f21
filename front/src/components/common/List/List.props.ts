import { ComponentProps, ReactNode } from 'react';

export interface ListProps extends ComponentProps<'ul'> {
  children: ReactNode;
}
