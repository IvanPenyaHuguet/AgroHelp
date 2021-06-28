import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRxData } from 'rxdb-hooks'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import CircularProgress from '@material-ui/core/CircularProgress'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

export default function CollapsableRow(props) {
  const { id, length, open } = props

  const { result, isFetching } = useRxData('trees', collection =>
    collection.find({ selector: { _id: { $in: id.map(r => r.tree) } } })
  )

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={length}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Cultivos
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Cultivo</TableCell>
                  <TableCell>Variedad</TableCell>
                  <TableCell align="right">Dosis Min.</TableCell>
                  <TableCell align="right">Dosis Max.</TableCell>
                  <TableCell>Enfermedad</TableCell>
                  <TableCell>Plazo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isFetching ? (
                  <TableRow colSpan={6}>
                    <TableCell>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {id.map((row, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{result[ind].name}</TableCell>
                        <TableCell>{result[ind].variety}</TableCell>
                        <TableCell align="right">{row.minDose}</TableCell>
                        <TableCell align="right">{row.maxDose}</TableCell>
                        <TableCell>{row.disease}</TableCell>
                        <TableCell>{row.term}</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
