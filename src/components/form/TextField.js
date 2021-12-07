import React from 'react'
import { TextField } from 'formik-mui'
import { Field } from 'formik'

const sxClasses= {
  root: {
    margin: '20px',
    height: '80px',
  },
};

const TextFieldInput = ({ label, name, variant = 'outlined', ...props }) => {

  return (
    <Field
      component={TextField}
      label={label}
      name={name}
      variant={variant}
      sx={sxClasses.root}
      {...props}
    />
  )
}

export default React.memo(TextFieldInput)
