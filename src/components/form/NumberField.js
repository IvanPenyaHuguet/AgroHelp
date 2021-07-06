import React from 'react'
import { TextField } from 'formik-material-ui'
import { Field } from 'formik'
import NumberFormat from 'react-number-format'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
    height: '80px',
  },
})

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
    />
  )
}

const NumberFieldInput = ({ label, name, variant = 'outlined', ...props }) => {
  const classes = useStyles()
  return (
    <Field
      component={TextField}
      label={label}
      name={name}
      variant={variant}
      className={classes.root}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...props}
    />
  )
}

export default React.memo(NumberFieldInput)
