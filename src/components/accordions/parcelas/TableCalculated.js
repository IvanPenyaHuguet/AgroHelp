import { useEffect, useState } from 'react'
import { Container } from '../../Exports'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 700,
  },
  table: {
    minWidth: 700,
  },
})

export default function TableCalculated({ values }) {
  const classes = useStyles()
  const [totalData, setTotalData] = useState({})

  useEffect(() => {
    let totals = {
      totalWater: 0,
      totalMinDosis: 0,
      totalMaxDosis: 0,
      unit: values.reagent.unit,
    }
    values.fields.forEach(field => {
      totals = {
        ...totals,
        totalWater: totals.totalWater + field.necWater,
        totalMinDosis: totals.totalMinDosis + field.minNecDose,
        totalMaxDosis: totals.totalMaxDosis + field.maxNecDose,
      }
    })
    setTotalData(totals)
  }, [values])

  return (
    <TableContainer component={Container} className={classes.table}>
      {values.fields.length > 0 && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Parcela</TableCell>
              <TableCell align="center">Cultivo</TableCell>
              <TableCell align="right">Agua</TableCell>
              <TableCell align="right">Nec. Min.</TableCell>
              <TableCell align="right">Nec. Max.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.fields &&
              values.fields.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.cultivo}</TableCell>
                  <TableCell align="right">{row.necWater} L</TableCell>
                  <TableCell align="right">
                    {row.minNecDose} {row.reagUnit}
                  </TableCell>
                  <TableCell align="right">
                    {row.maxNecDose} {row.reagUnit}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={2}>
                Total
              </TableCell>
              <TableCell align="right">{totalData.totalWater} L</TableCell>
              <TableCell align="right">
                {totalData.totalMinDosis} {totalData.unit}
              </TableCell>
              <TableCell align="right">
                {totalData.totalMaxDosis} {totalData.unit}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </TableContainer>
  )
}
