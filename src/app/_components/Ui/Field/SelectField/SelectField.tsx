'use client';

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SelectFieldProps } from "./SelectField.types";
import styles from './SelectField.module.scss';
import clsx from "clsx";

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  error,
  className,
  value,
  defaultValue,
  placeholder,
  options,
  disabled,
  iconLeft,
  onFocus,
  onBlur,
  onChange,
  required,
  autoFocus,
  tabIndex,
  title,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(String(value ?? defaultValue ?? ''));
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const currentValue = isControlled ? String(value ?? '') : internalValue;
  const selectedOption = options.find((option) => option.value === currentValue);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ''));
    }
  }, [isControlled, value]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const emitSelectEvent = <T,>(handler: ((event: T) => void) | undefined) => {
    if (!handler) return;

    handler({
      target: { value: currentValue, name, id },
      currentTarget: { value: currentValue, name, id },
    } as T);
  };

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((current) => {
      const next = !current;
      if (next) {
        emitSelectEvent<React.FocusEvent<HTMLSelectElement>>(onFocus);
      }
      return next;
    });
  };

  const handleBlur = () => {
    setIsOpen(false);
    emitSelectEvent<React.FocusEvent<HTMLSelectElement>>(onBlur);
  };

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: { value: nextValue, name, id },
      currentTarget: { value: nextValue, name, id },
    } as React.ChangeEvent<HTMLSelectElement>);

    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className={styles.field}>
      {label ? <label id={labelId} className={styles.label}>{label}</label> : null}
      <div ref={wrapperRef} className={styles.inputWrapper}>
        <select
          id={`${id}-native`}
          name={name}
          value={currentValue}
          required={required}
          tabIndex={-1}
          aria-hidden='true'
          className={styles.nativeSelect}
          onChange={() => undefined}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {iconLeft ? <span className={`${styles.icon} ${styles.iconLeft}`}>{iconLeft}</span> : null}
        <button
          ref={buttonRef}
          id={id}
          type='button'
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          title={title}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={listboxId}
          aria-labelledby={label ? `${labelId} ${id}` : id}
          className={clsx(
            styles.select,
            iconLeft && styles.withIconLeft,
            isOpen && styles.open,
            className && className
          )}
          onClick={handleToggle}
          onBlur={handleBlur}
        >
          <span className={selectedOption ? styles.value : styles.placeholder}>{selectedOption?.label ?? placeholder ?? 'Selecionar'}</span>
        </button>
        <span className={`${styles.icon} ${styles.iconRight}`}>
          {isOpen ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
        </span>
        {(
          <div id={listboxId} role='listbox' className={clsx(
            styles.dropdown,
            isOpen && styles.dropdownActive
          )}>
            {placeholder && (
              <button
                type='button'
                role='option'
                aria-selected={currentValue === ''}
                className={clsx(
                  styles.option,
                  currentValue === '' ? styles.optionSelected : '',
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect('')}
              >
                {placeholder}
              </button>
            )}
            {options.map((option, index) => (
              <button
                key={option.value}
                type='button'
                role='option'
                disabled={option.disabled}
                aria-selected={option.value === currentValue}
                className={clsx(
                  styles.option,
                  option.value === currentValue ? styles.optionSelected : '',
                  index % 2 === 0 && styles.optionSecondary
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error ? <div id={errorId} role='alert' className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};

