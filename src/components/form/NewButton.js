import { Button } from '../Exports'

const sxClasses = {    
    button: {
      display: 'block',
      marginTop: '20px',
      textAlign: 'center',
      position: 'relative',
      left: '50%',
      height: '60px',
      width: '200px',
      fontWeight: '700',
      fontSize: '1.5rem',
      color: 'black',
      transform: 'translateX(-50%)'
    }
  };

export default function NewButton ({isSubmitting, sxClass, ...props}) {
    return (
        <Button disabled={isSubmitting} type="submit" sx={[sxClasses.button, sxClass]} {...props}>
            Nuevo
        </Button>
    )
}