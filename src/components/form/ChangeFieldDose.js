import { useEffect, useState } from 'react'
import { useFormikContext, useField } from 'formik'
import TextField from './TextField'

export default function ChangeFieldDose() {
  const { values, setFieldValue } = useFormikContext()
  const { quantityUsedReagent, literWater } = values

  useEffect(() => {
    if (quantityUsedReagent && literWater) {
      setFieldValue(
        'dose',
        (Number(quantityUsedReagent) / Number(literWater)) * 100
      )
    }
  }, [quantityUsedReagent, literWater, setFieldValue])

  return <TextField name="dose" label="Dosis (%)" type="number" />
}
