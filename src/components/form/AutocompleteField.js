import { Autocomplete } from 'formik-mui'
import { Field } from 'formik'
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useRxData } from 'rxdb-hooks'

const sxClasses = {
  root: {
    margin: '20px',
    width: '300px',
    height: '80px',
  },
};

export default function ({
  label,
  name,
  collection,
  getOptionLabel,
  errors,
  touched,
  ...props
}) {


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
      sx={sxClasses.root}
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
              (<>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>)
            ),
          }}
        />
      )}
      {...props}
    />
  );
}
