'use client'

import { ButtonProps } from "./Button.types";
import React from "react";
import cx from "clsx";
import styles from "./Button.module.scss";

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fontSize,
  fontWeight,
  children,
  type,
  style,
  className,
  ...rest
}) => {
  return (
    <button
      type={type || 'button'}
      className={cx(styles.button, styles[variant], styles[size], className)}
      style={{
        ...(style || {}),
        ...(fontSize ? ({ ['--fontSize' as any]: fontSize } as React.CSSProperties) : {}),
        ...(fontWeight ? ({ ['--fontWeight' as any]: fontWeight } as React.CSSProperties) : {}),
      }}
      {...rest}
    >
      {children}
    </button>
  );
}