'use client';

import cx from 'clsx';
import type { SkeletonProps, SkeletonSize } from './Skeleton.types';
import styles from './Skeleton.module.scss';

function toCssSize(value?: SkeletonSize) {
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  minWidth,
  minHeight,
  borderRadius,
  circle = false,
  className,
  style,
  ...rest
}) => {
  const resolvedRadius = circle ? '999px' : toCssSize(borderRadius);

  return (
    <div
      aria-hidden="true"
      className={cx(styles.skeleton, circle && styles.circle, className)}
      style={{
        ...(style || {}),
        ['--skeletonWidth' as any]: toCssSize(width),
        ['--skeletonHeight' as any]: toCssSize(height),
        ...(minWidth ? ({ ['--skeletonMinWidth' as any]: toCssSize(minWidth) } as React.CSSProperties) : {}),
        ...(minHeight ? ({ ['--skeletonMinHeight' as any]: toCssSize(minHeight) } as React.CSSProperties) : {}),
        ...(resolvedRadius ? ({ ['--skeletonRadius' as any]: resolvedRadius } as React.CSSProperties) : {}),
      }}
      {...rest}
    />
  );
};
