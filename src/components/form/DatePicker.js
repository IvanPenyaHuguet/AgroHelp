import { DatePicker } from 'formik-mui-lab';
import { Field } from 'formik'
import { Box } from '../Exports';

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
  sxClass,
  ...props
}) {

  return (
    <Box sx={[sxClasses.root, sxClass]}>
      <Field
        component={DatePicker}
        label={label}
        name={name}
        inputFormat={format}
        disableToolbar
        variant="inline"
        inputVariant={variant}      
        {...props}
      />
    </Box>
    
  )
}
