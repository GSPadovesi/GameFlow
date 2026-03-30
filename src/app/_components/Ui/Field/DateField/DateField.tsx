import { InputField } from '../InputField';
import type { DateFieldProps } from './DateField.types';

export const DateField: React.FC<DateFieldProps> = (props) => {
  return <InputField {...props} inputType='date' />;
};
