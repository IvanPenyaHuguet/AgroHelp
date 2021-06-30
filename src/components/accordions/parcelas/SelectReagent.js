import { useEffect } from 'react'
import { AutocompleteField } from '../../Exports'
import { useFormikContext } from 'formik'

const getData = (reagent, row) => {
  let result = {}
  reagent.trees.forEach(element => {
    if (row.tree.id == element.tree) {
      result = {
        minNecDose: Number(
          ((row.plantedArea * 1000 * element.minDose) / 100).toFixed(3)
        ),
        maxNecDose: Number(
          ((row.plantedArea * 1000 * element.maxDose) / 100).toFixed(3)
        ),
        maxReagentDose: element.maxDose,
      }
    }
  })
  return result
}

export default function SelectReagent({ errors, touched, rowSelected }) {
  const { values, setFieldValue } = useFormikContext()
  const { reagent, literWaterSpec } = values

  useEffect(() => {
    if (reagent && literWaterSpec && rowSelected.length > 0) {
      setFieldValue(
        'fields',
        rowSelected.map(row => {
          return {
            ...{
              name: row.name,
              area: row.plantedArea,
              refCast: row.refCast,
              cultivo: row.tree.name,
              necWater: row.plantedArea * 1000,
              reagUnit: reagent.unit,
            },
            ...getData(reagent, row),
          }
        })
      )
    }
  }, [reagent, literWaterSpec, rowSelected, setFieldValue])

  return (
    <AutocompleteField
      name="reagent"
      label="Reactivo"
      collection="reagents"
      errors={errors}
      touched={touched}
    />
  )
}
