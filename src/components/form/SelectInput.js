import { Field } from 'formik'
import MenuItem from '@mui/material/MenuItem';

import { Select } from 'formik-mui';

const sxClasses = {
  root: {
    margin: '20px',
    width: '200px',
    minWidth: '200px',
    height: '80px',
  },
  label: {
    transform: 'translate(14px, 20px) scale(1)',
  },
};

const menuItems = items => {
  return items.map((item, index) => {
    return (
      <MenuItem key={index} value={item.id ? item.id : item.value}>
        {item.name} {item.variety ? item.variety : ''}
      </MenuItem>
    )
  })
}

export default function SelectInput({ label, name, items, ...props }) {
  return (    
      <Field
        formControl={{ sx: sxClasses.root }}
        component={Select}
        name={name}
        variant="outlined"
        labelId={`label-${name}`}
        label={label}
        inputProps={{
          id: `id-${name}`,
        }}
        {...props}
      >
        {menuItems(items)}
      </Field>   
  );
}
