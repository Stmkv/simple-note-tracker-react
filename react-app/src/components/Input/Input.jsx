import { forwardRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classname';

const Input = forwardRef(function Input(
  { className, isValid, appearence, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles['input'], {
        [styles['invalid']]: isValid,
        [styles['input-title']]: appearence === 'title',
      })}
    />
  );
});
export default Input;
