import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid'
import { useRxCollection } from 'rxdb-hooks'
import { AlertContext } from '../../../context/AlertContext';


export default function DeleteActionCell ({collection, id}) {
    const collect = useRxCollection(collection);
    const { setAlert } = useContext(AlertContext);

    const handleDeleteClick = (id) => (event) => {
        event.stopPropagation();
        collect.findOne({
            selector: {
              id: id
            }
        }).exec().then((document) => {
            document.update({ $set: { deleteddAt: dayjs().valueOf() }}).themn(() => {
                document.remove().then(() => {
                    setAlert({
                        type: 'success',
                        message:
                        'Borrado con éxito',
                    })
                });
            });            
        }).catch( err => {
            console.error(err)
            setAlert({
                type: 'error',
                message:
                'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
            })
        });        
    };

    return (
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />
    )
}