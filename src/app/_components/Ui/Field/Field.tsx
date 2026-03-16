import type { FieldProps } from './Field.types';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';

export const Field: React.FC<FieldProps> = (props) => {
  switch (props.type) {
    case 'textarea': {
      const { type: _type, ...textAreaProps } = props;
      return <TextAreaField {...textAreaProps} />;
    }
    case 'select': {
      const { type: _type, ...selectProps } = props;
      return <SelectField {...selectProps} />
    }
    case 'input':
    default: {
      const { type: _type, ...inputProps } = props;
      return <InputField {...inputProps} />;
    }
  }
};
