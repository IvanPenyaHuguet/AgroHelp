import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import TextField from './TextField'
import RefCatToLocation from '../../services/helpers/RefCatToLocation'
import LocationToRefCat from '../../services/helpers/LocationToRefCat'
import { GetFieldsAreas } from '../../services/RequestService'

export default function RefCatInput({ name, label }) {
  const { values, setValues, errors } = useFormikContext()
  const { refCast, province, town, polygon, parcel } = values
  const refCastError = errors.refCast

  useEffect(async () => {
    if (
      refCast &&
      refCast.length == 20 &&
      !refCastError &&
      !parcel &&
      !province
    ) {
      const areas = await GetFieldsAreas(refCast)
      setValues({ ...values, ...RefCatToLocation(refCast), ...areas }, false)
    }
  }, [refCast, refCastError, setValues])

  useEffect(() => {
    if (province && town && polygon && parcel) {
      setValues(
        {
          ...values,
          refCast: LocationToRefCat({ province, town, polygon, parcel }),
        },
        false
      )
    }
  }, [province, town, polygon, parcel, setValues])

  return <TextField name={name} label={label} />
}
