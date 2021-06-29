import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import TextField from './TextField'
import RefCatToLocation from '../../services/helpers/RefCatToLocation'
import { GetFieldsAreas } from '../../services/RequestService'

export default function RefCatInput({ name, label }) {
  const { values, setValues, errors } = useFormikContext()
  const { refCast } = values
  const refCastError = errors.refCast

  useEffect(async () => {
    if (refCast && refCast.length == 20 && !refCastError) {
      const areas = await GetFieldsAreas(refCast)
      setValues({ ...values, ...RefCatToLocation(refCast), ...areas }, false)
    }
  }, [refCast, refCastError, setValues])

  return <TextField name={name} label={label} />
}
