import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { SelectInput } from '../Exports'
import { GetReagentData } from '../../services/RequestService'

export default function SelectFieldReagent({ name, label, items, index }) {
  const { values, setFieldValue } = useFormikContext()
  const { trees, nReg } = values

  useEffect(async () => {
    if (trees && nReg && trees[index] && trees[index].tree) {
      const dosis = await GetReagentData(nReg, trees[index].tree)
      setFieldValue(`trees.${index}.minDose`, dosis.minDose, false)
      setFieldValue(`trees.${index}.maxDose`, dosis.maxDose, false)
    }
  }, [trees, nReg])

  return <SelectInput name={name} label={label} items={items} />
}
