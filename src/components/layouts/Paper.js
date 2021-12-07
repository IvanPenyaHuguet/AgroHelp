import Paper from '@mui/material/Paper'

export default function ({ children, ...props }) {
  return <Paper {...props}>{children}</Paper>
}
