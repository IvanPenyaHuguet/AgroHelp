import { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid'
import { useRxCollection } from 'rxdb-hooks'
import dayjs from 'dayjs'
import { AlertContext } from '../../../context/AlertContext';
import { ConfirmModal } from '../../Exports';


export default function DeleteActionCell ({collection, id}) {
    const collect = useRxCollection(collection);
    const { setAlert } = useContext(AlertContext);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const refuseCallback = () => {
        setOpen(false);
    }

    const confirmCallback = (evt) => {
        setOpen(false);
        evt.stopPropagation();
        handleDeleteClick(id);
    }

    const handleDeleteClick = (id) => {        
        collect.findOne({
            selector: {
              id: id
            }
        }).exec().then((document) => {
            document.update({ $set: { deletedAt: dayjs().valueOf() }}).then(() => {
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
        <>
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleClick}
            color="inherit"
            />
            <ConfirmModal open={open} title="¿Está seguro de eliminarlo?" onConfirmCallback={confirmCallback} onRefuseCallback={refuseCallback} />
        </>
        
    )
}