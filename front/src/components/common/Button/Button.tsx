import styles from './Button.module.css';
import { ButtonProps } from './Button.props.ts';
import cn from 'classnames';


function Button({ label, onClick, className, ...props }: ButtonProps) {
  const cl = cn(styles['button'], className);

  return (
    <button {...props} className={cl} onClick={onClick}>{label}</button>
  );
}

export default Button;
