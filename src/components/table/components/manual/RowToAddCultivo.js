import { TextField, SelectInput } from '../../../Exports'
import { useFormikContext } from 'formik'

import { useRxData } from 'rxdb-hooks'

import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import SaveIcon from '@mui/icons-material/Save'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'


const sxClasses = {
  small: {
    width: '80px',
    height: '80px',
  },
  big: {
    width: '130px',
    height: '80px',
  },
};

export default function RowToAddCultivo() {
  const { isSubmitting, resetForm, submitForm } = useFormikContext()

  const { result, isFetching } = useRxData(
    'trees',
    collection => collection.find(),
    {
      json: true,
    }
  )

  return (
    <TableRow>
      <TableCell>
        <SelectInput
          name="tree"
          label=""
          items={isFetching ? [] : result}
          variant="standard"
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <TextField
          name="minDose"
          label=""
          variant="standard"
          type="number"
          sx={sxClasses.small}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="maxDose"
          label=""
          variant="standard"
          type="number"
          sx={sxClasses.small}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="disease"
          label=""
          variant="standard"
          sx={sxClasses.big}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="term"
          label=""
          variant="standard"
          type="number"
          sx={sxClasses.small}
        />
      </TableCell>
      <TableCell>
        <IconButton
          size="large"
          color="secondary"
          aria-label="Borrar"
          component="span"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          size="large"
          color="secondary"
          aria-label="Borrar"
          component="span"
          onClick={resetForm}
        >
          <RotateLeftIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
