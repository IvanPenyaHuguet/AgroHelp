import { Form } from 'formik'

export default function ({ children, ...props }) {

  return (
    <Form sx={{height: '100%'}} {...props}>
      {children}
    </Form>
  );
}
