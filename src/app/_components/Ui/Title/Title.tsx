'use client';

import { TitleProps, TitleSize, TitleVariant } from "./Title.types";
import cx from "clsx";
import styles from './Title.module.scss';
import Balancer from "react-wrap-balancer";

const variantToSize: Record<TitleVariant, TitleSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
};

function sizeClasses(size: TitleSize) {
  switch (size) {
    case 'sm': return styles.sizeSm;
    case 'md': return styles.sizeMd;
    case 'lg': return styles.sizeLg;
    case 'xl': return styles.sizeXl;
    case '2xl': return styles.size2xl;
    case '3xl': return styles.size3xl;
    default: return styles.sizeMd;
  }
}

export const Title: React.FC<TitleProps> = ({
  variant = 'h1',
  size = 'md',
  textAlign = 'left',
  fontFamily,
  fontWeight,
  fontColor,
  style,
  className,
  children,
  ...rest
}) => {
  const Tag = variant as TitleVariant;

  return (
    <Tag
      className={cx(styles.title, sizeClasses(variantToSize[variant]), styles[textAlign], className)}
      style={{
        ...(style || {}),
        ...(fontFamily ? ({ ['--fontFamily' as any]: fontFamily } as React.CSSProperties) : {}),
        ...(fontWeight ? ({ ['--fontWeight' as any]: fontWeight } as React.CSSProperties) : {}),
        ...(textAlign ? ({ ['--textAlign' as any]: textAlign } as React.CSSProperties) : {}),
        ...(fontColor ? ({ ['--fontColor' as any]: fontColor } as React.CSSProperties) : {}),
      }}
      {...rest}
    >
      <Balancer>{children}</Balancer>
    </Tag>
  );
}