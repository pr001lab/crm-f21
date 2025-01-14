import styles from './Heading.module.css';
import { HeadingProps } from './Heading.props.ts';
import cn from 'classnames';

function Heading({ children, className, level='h1', ...props }: HeadingProps) {
  const cl = cn(styles['heading'], className);

  const Tag = level;

  return (
    <Tag {...props} className={cl}>
      {children}
    </Tag>
  );
}

export default Heading;
