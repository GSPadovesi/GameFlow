import { DateField } from './DateField';
import type { FieldProps } from './Field.types';
import { InputField } from './InputField';
import { NumberField } from './NumberField/NumberField';
import { RadioField } from './RadioField';
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
    case 'radio': {
      const { type: _type, ...radioProps } = props;
      return <RadioField {...radioProps} />
    }
    case 'number': {
      const { type: _type, ...numberProps } = props;
      return <NumberField {...numberProps} />
    }
    case 'date': {
      const { type: _type, ...dateProps } = props;
      return <DateField {...dateProps} />;
    }
    case 'input':
    default: {
      const { type: _type, ...inputProps } = props;
      return <InputField {...inputProps} />;
    }
  }
};
