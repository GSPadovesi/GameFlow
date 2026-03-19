'use client';

import { useEffect, useState } from "react";
import type { RadioFieldProps } from "./RadioField.types";
import clsx from "clsx";
import styles from "./RadioField.module.scss";

export const RadioField: React.FC<RadioFieldProps> = ({
  id,
  name,
  label,
  error,
  className,
  options,
  value,
  defaultValue,
  disabled,
  onFocus,
  onBlur,
  onChange,
  required,
  autoFocus,
  tabIndex,
  title,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(String(value ?? defaultValue ?? ""));
  const currentValue = isControlled ? String(value ?? "") : internalValue;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ""));
    }
  }, [isControlled, value]);

  const handleChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: { value: nextValue, name, id },
      currentTarget: { value: nextValue, name, id },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.field}>
      {label ? <label id={labelId} className={styles.label}>{label}</label> : null}
      <div
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={styles.buttonsWrapper}
      >
        {options.map((option, index) => {
          const optionId = `${id}-${option.value}`;
          const isChecked = currentValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={clsx(
                styles.button,
                isChecked && styles.buttonActive,
                (disabled || option.disabled) && styles.buttonDisabled,
                className
              )}
            >
              <input
                id={optionId}
                className={styles.input}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={disabled || option.disabled}
                required={required && index === 0}
                autoFocus={autoFocus && index === 0}
                tabIndex={tabIndex}
                title={title}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={() => handleChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? <div id={errorId} role="alert" className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};
