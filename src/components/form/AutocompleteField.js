import { Autocomplete } from 'formik-material-ui-lab'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useRxData } from 'rxdb-hooks'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
    width: '300px',
    height: '80px',
  },
})

export default function ({
  label,
  name,
  collection,
  getOptionLabel,
  errors,
  touched,
  ...props
}) {
  const classes = useStyles()

  const { result, isFetching } = useRxData(collection, col => col.find(), {
    json: true,
  })

  return (
    <Field
      component={Autocomplete}
      name={name}
      options={result}
      loading={isFetching}
      variant="outlined"
      className={classes.root}
      getOptionLabel={option =>
        getOptionLabel ? getOptionLabel(option) : option.name ? option.name : ''
      }
      renderInput={params => (
        <TextField
          {...params}
          error={touched && errors && touched[name] && errors[name]}
          helperText={touched && errors && errors[name]}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  )
}
