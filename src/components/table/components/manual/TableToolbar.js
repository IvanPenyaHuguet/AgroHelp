import { lighten } from '@mui/material/styles';

import clsx from 'clsx'

import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'

const sxClasses = {
  root: {
    paddingLeft: 2,
    paddingRight: 1,
  },
  highlight: (theme) => ({
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  }),
  title: {
    flex: '1 1 100%',
  }
};


const EnhancedTableToolbar = props => {
  
  const { numSelected, handleDeleteClick } = props

  return (
    <Toolbar
      sx={[sxClasses.root, numSelected > 0 && sxClasses.highlight]}      
    >
      {numSelected > 0 ? (
        <Typography
          sx={sxClasses.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography
          sx={sxClasses.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Reactivos
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" size="large" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" size="large">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default EnhancedTableToolbar
