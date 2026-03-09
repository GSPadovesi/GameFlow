import type { TextAreaFieldProps } from './TextAreaField.types';
import styles from './TextAreaField.module.scss';

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ id, name, label, error, className, minRows = 3, maxRows, style, ...props }) => {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
      <textarea
        id={id}
        name={name}
        rows={minRows}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={className ? `${styles.textArea} ${className}` : styles.textArea}
        style={{
          ...style,
          maxHeight: maxRows ? `calc(${maxRows} * 1.4em + 24px)` : style?.maxHeight,
        }}
        {...props}
      />
      {error ? <div id={errorId} role='alert' className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};
