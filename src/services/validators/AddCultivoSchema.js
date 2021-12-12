import * as Yup from 'yup'

export const AddCultivoSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muy corto!')
      .max(50, 'Muy largo!')
      .required('Necesario'),
})


