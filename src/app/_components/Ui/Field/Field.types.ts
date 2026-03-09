export interface BaseFieldProps {
  id: string;
  name: string;
  label?: string;
  error?: string;
  className?: string;
}

export interface InputFieldProps extends BaseFieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'> {
  inputType?: React.HTMLInputTypeAttribute;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export interface TextAreaFieldProps extends BaseFieldProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name'> {
  minRows?: number;
  maxRows?: number;
}

export type FieldProps =
  | ({ type: 'input' } & InputFieldProps)
  | ({ type: 'textarea' } & TextAreaFieldProps);
