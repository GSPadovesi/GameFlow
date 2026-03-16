export type ParagraphSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ParagraphAlign = 'left' | 'center' | 'right' | 'justify';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  balance?: boolean;
  size?: ParagraphSize;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: ParagraphAlign;
  fontColor?: string;
  lineHeight?: string;
  fontStyle?: string;
  children: React.ReactNode;
}
