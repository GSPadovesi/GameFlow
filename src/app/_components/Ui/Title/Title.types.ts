export type TitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitleSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TitleAlign = 'left' | 'center' | 'right' | 'justify';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: TitleVariant;
  size?: TitleSize;
  fontFamily?: string;
  fontWeight?: string; 
  textAlign?: TitleAlign, 
  fontColor?: string;
  children: React.ReactNode;
}
