import { DatePicker } from 'formik-mui-lab';
import { Field } from 'formik'

const PREFIX = 'DatePicker';

const classes = {
  root: `${PREFIX}-root`
};

const sxClasses = {
  root: {
    margin: '20px',
  },
};

export default function ({
  label,
  name,
  format = 'DD/MM/YYYY',
  variant = 'outlined',
  ...props
}) {

  return (
    <Field
      component={DatePicker}
      label={label}
      name={name}
      inputFormat={format}
      disableToolbar
      variant="inline"
      inputVariant={variant}
      sx={sxClasses.root}
      {...props}
    />
  )
}
