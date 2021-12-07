import { useState, useContext } from 'react'
import { useRxData } from 'rxdb-hooks'
import * as dayjs from 'dayjs'
import RowToAddCultivo from './RowToAddCultivo'
import { AlertContext } from '../../../../context/AlertContext'
import { Form } from '../../../Exports'
import { Formik } from 'formik'
import * as Yup from 'yup'

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse'
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const RowCultivoSchema = Yup.object().shape({
  tree: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Necesario'),
  minDose: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  maxDose: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .min(Yup.ref('minDose'), 'Debe ser mayor a la dosis minima')
    .required('Necesario'),
  disease: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Necesario'),
  term: Yup.number('Debe de ser un numero')
    .integer('Debe de ser un numero entero')
    .min(0, 'Debe de ser un numero positivo')
    .required('Necesario'),
})

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
  const { setAlert } = useContext(AlertContext)

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
            <Formik
              initialValues={{
                tree: '',
                minDose: 0,
                maxDose: 0,
                disease: '',
                term: 0,
              }}
              validationSchema={RowCultivoSchema}
              onSubmit={async (values, actions) => {
                try {
                  console.log(values)
                  await id.update({
                    $push: {
                      trees: { ...values },
                    },
                    $set: {
                      updatedAt: dayjs().valueOf(), // sets firstName to foobar
                    },
                  })
                  setAlert({
                    type: 'success',
                    message: 'Guardado con éxito',
                  })
                  actions.resetForm()
                } catch (err) {
                  console.error(err)
                  setAlert({
                    type: 'error',
                    message:
                      'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
                  })
                }
              }}
            >
              <Form>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cultivo</TableCell>
                      <TableCell>Variedad</TableCell>
                      <TableCell align="right">Dosis Min.</TableCell>
                      <TableCell align="right">Dosis Max.</TableCell>
                      <TableCell>Enfermedad</TableCell>
                      <TableCell>Plazo</TableCell>
                      <TableCell>Accion</TableCell>
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
                            <TableCell>
                              {result.find(tree => tree._id == row.tree).name}
                            </TableCell>
                            <TableCell>
                              {
                                result.find(tree => tree._id == row.tree)
                                  .variety
                              }
                            </TableCell>
                            <TableCell align="right">{row.minDose}</TableCell>
                            <TableCell align="right">{row.maxDose}</TableCell>
                            <TableCell>{row.disease}</TableCell>
                            <TableCell>{row.term}</TableCell>
                            <TableCell>
                              <IconButton
                                color="secondary"
                                aria-label="Borrar"
                                component="span"
                                size="large"
                                disabled={isDeleting}
                                onClick={e =>
                                  deleteTree(e, row, id, setIsDeleting)
                                }
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        <RowToAddCultivo collection={id} />
                      </>
                    )}
                  </TableBody>
                </Table>
              </Form>
            </Formik>
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
                  <TableCell>Accion</TableCell>
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
                                size="large"
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
