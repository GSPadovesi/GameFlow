import { InputField } from '../InputField';
import type { NumberFieldProps } from './NumberField.types';

export const NumberField: React.FC<NumberFieldProps> = (props) => {
  return <InputField {...props} inputType='number' />;
};
