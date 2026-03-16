import clsx from 'clsx';
import type { InputFieldProps } from './InputField.types';
import styles from './InputField.module.scss';

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  error,
  className,
  inputType = 'text',
  iconLeft,
  iconRight,
  size,
  value,
  defaultValue,
  placeholder,
  ref,
  ...props
}) => {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
      <div className={styles.inputWrapper}>
        {iconLeft ? <span className={`${styles.icon} ${styles.iconLeft}`}>{iconLeft}</span> : null}
        <input
          ref={ref}
          id={id}
          name={name}
          type={inputType}
          size={size}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            styles.input,
            iconLeft && styles.withIconLeft,
            iconRight && styles.withIconRight,
            className,
          )}
          {...props}
        />
        {iconRight ? <span className={`${styles.icon} ${styles.iconRight}`}>{iconRight}</span> : null}
      </div>
      {error ? <div id={errorId} role='alert' className={styles.errorMessage}>{error}</div> : null}
    </div>

  );
};
