import { useEffect, useState } from 'react'
import { Container } from '../../Exports'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const sxClasses = {
  root: {
    minWidth: 700,
  },
  table: {
    minWidth: 700,
  },
};

export default function TableCalculated({ values }) {

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
    <TableContainer component={Container} sx={sxClasses.table}>
      {values.fields.length > 0 && (
        <Table sx={sxClasses.table}>
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
  );
}
