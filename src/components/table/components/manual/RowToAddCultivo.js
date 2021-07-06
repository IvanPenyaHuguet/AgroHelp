import { TextField, SelectInput } from '../../../Exports'
import { useFormikContext } from 'formik'

import { useRxData } from 'rxdb-hooks'

import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import SaveIcon from '@material-ui/icons/Save'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  small: {
    width: '80px',
    height: '80px',
  },
  big: {
    width: '130px',
    height: '80px',
  },
})

export default function RowToAddCultivo() {
  const { isSubmitting, resetForm, submitForm } = useFormikContext()
  const classes = useStyles()
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
          className={classes.small}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="maxDose"
          label=""
          variant="standard"
          type="number"
          className={classes.small}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="disease"
          label=""
          variant="standard"
          className={classes.big}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="term"
          label=""
          variant="standard"
          type="number"
          className={classes.small}
        />
      </TableCell>
      <TableCell>
        <IconButton
          color="secondary"
          aria-label="Borrar"
          component="span"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="Borrar"
          component="span"
          onClick={resetForm}
        >
          <RotateLeftIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
