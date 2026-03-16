'use client';

import Balancer from 'react-wrap-balancer';
import cx from 'clsx';
import type { ParagraphProps, ParagraphSize } from './Paragraph.types';
import styles from './Paragraph.module.scss';

function sizeClasses(size: ParagraphSize) {
  switch (size) {
    case 'sm': return styles.sizeSm;
    case 'md': return styles.sizeMd;
    case 'lg': return styles.sizeLg;
    case 'xl': return styles.sizeXl;
    case '2xl': return styles.size2xl;
    default: return;
  }
}

export const Paragraph: React.FC<ParagraphProps> = ({
  balance = false,
  size = 'md',
  fontFamily,
  fontSize,
  fontWeight,
  textAlign = 'left',
  fontColor,
  lineHeight,
  fontStyle,
  style,
  className,
  children,
  ...rest
}) => {
  return (
    <p
      className={cx(styles.paragraph, sizeClasses(size), styles[textAlign], className)}
      style={{
        ...(style || {}),
        ...(fontFamily ? ({ ['--fontFamily' as any]: fontFamily } as React.CSSProperties) : {}),
        ...(fontSize ? ({ ['--fontSize' as any]: fontSize } as React.CSSProperties) : {}),
        ...(fontWeight ? ({ ['--fontWeight' as any]: fontWeight } as React.CSSProperties) : {}),
        ...(textAlign ? ({ ['--textAlign' as any]: textAlign } as React.CSSProperties) : {}),
        ...(fontColor ? ({ ['--fontColor' as any]: fontColor } as React.CSSProperties) : {}),
        ...(lineHeight ? ({ ['--lineHeight' as any]: lineHeight } as React.CSSProperties) : {}),
        ...(fontStyle ? ({ ['--fontStyle' as any]: fontStyle } as React.CSSProperties) : {}),
      }}
      {...rest}
    >
      {balance ? <Balancer>{children}</Balancer> : children}
    </p>
  );
};
