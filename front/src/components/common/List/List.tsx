import styles from './List.module.css';
import { ListProps } from './List.props.ts';
import cn from 'classnames';

function List({ children, className, ...props }: ListProps) {
  const cl = cn(styles['list'], className);

  return (
    <ul {...props} className={cl}>
      {children}
    </ul>
  );
}

export default List;
