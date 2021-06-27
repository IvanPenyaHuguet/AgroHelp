import { Formik, Field, Form } from 'formik'

import { Paper } from '../../../Exports'

export default function ParcelaAdd() {
  return (
    <Paper>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Form></Form>
      </Formik>
    </Paper>
  )
}
