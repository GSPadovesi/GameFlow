export type SkeletonSize = number | string;

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: SkeletonSize;
  height?: SkeletonSize;
  minWidth?: SkeletonSize;
  minHeight?: SkeletonSize;
  borderRadius?: SkeletonSize;
  circle?: boolean;
};
