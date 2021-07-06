import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRxData } from 'rxdb-hooks'
import * as dayjs from 'dayjs'
import { isRxDocument } from 'rxdb'

import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const deleteTree = async (e, row, doc, setIsDeleting) => {
  setIsDeleting(true)
  await doc.update({
    $pullAll: {
      trees: [row],
    },
  })
  setIsDeleting(false)
}
const deleteProduct = async (e, row, doc, setIsDeleting) => {
  setIsDeleting(true)
  await doc.update({
    $pullAll: {
      products: [row],
    },
  })
  setIsDeleting(false)
}

export default function CollapsableRow(props) {
  const { id, length, open } = props
  const [isDeleting, setIsDeleting] = useState(false)

  const { result, isFetching } = useRxData('trees', collection =>
    collection.find({ selector: { _id: { $in: id.trees.map(r => r.tree) } } })
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
                  <TableCell>Borrar</TableCell>
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
                    {id.trees.map((row, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{result[ind].name}</TableCell>
                        <TableCell>{result[ind].variety}</TableCell>
                        <TableCell align="right">{row.minDose}</TableCell>
                        <TableCell align="right">{row.maxDose}</TableCell>
                        <TableCell>{row.disease}</TableCell>
                        <TableCell>{row.term}</TableCell>
                        <TableCell>
                          <IconButton
                            color="secondary"
                            aria-label="Borrar"
                            component="span"
                            disabled={isDeleting}
                            onClick={e => deleteTree(e, row, id, setIsDeleting)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </Box>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Productos
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Num. Lote</TableCell>
                  <TableCell>Num. Factura</TableCell>
                  <TableCell align="right">Total Comprado</TableCell>
                  <TableCell align="right">Gastado</TableCell>
                  <TableCell>Fecha entrada</TableCell>
                  <TableCell>Agotado</TableCell>
                  <TableCell>Borrar</TableCell>
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
                    {id.products &&
                      id.products
                        .slice(0)
                        .reverse()
                        .map((row, ind) => (
                          <TableRow key={ind}>
                            <TableCell>{row.lotReagent}</TableCell>
                            <TableCell>{row.buyNumber}</TableCell>
                            <TableCell align="right">
                              {row.quantityTotal}
                            </TableCell>
                            <TableCell align="right">
                              {row.quantityUsed}
                            </TableCell>
                            <TableCell>
                              {dayjs(row.createdAt).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell>{row.spent}</TableCell>
                            <TableCell>
                              <IconButton
                                color="secondary"
                                aria-label="Borrar"
                                component="span"
                                disabled={isDeleting}
                                onClick={e =>
                                  deleteProduct(e, row, id, setIsDeleting)
                                }
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
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
