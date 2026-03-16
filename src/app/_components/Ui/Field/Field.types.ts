export interface BaseFieldProps {
  id: string;
  name: string;
  label?: string;
  error?: string;
  className?: string;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface InputFieldProps extends BaseFieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'> {
  inputType?: React.HTMLInputTypeAttribute;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export interface TextAreaFieldProps extends BaseFieldProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name'> {
  minRows?: number;
  maxRows?: number;
}
export interface SelectFieldProps extends BaseFieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'name'> {
  options: SelectOption[];
  placeholder?: string;
  iconLeft?: React.ReactNode;
}

export type FieldProps =
  | ({ type: 'input' } & InputFieldProps)
  | ({ type: 'textarea' } & TextAreaFieldProps)
  | ({ type: 'select' } & SelectFieldProps)
 
