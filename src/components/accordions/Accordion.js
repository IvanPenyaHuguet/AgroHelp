import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const AccordionComponent = ({
  header,
  subheader = '',
  children,
  panel = 'panel1',
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Accordion
      expanded={expanded === panel}
      onChange={handleChange(panel)}
      TransitionProps={{ unmountOnExit: true }}
      elevation={3}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{header}</Typography>
        <Typography className={classes.secondaryHeading}>
          {subheader}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
export default React.memo(AccordionComponent)
