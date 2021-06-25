import Paper from '@material-ui/core/Paper'

export default function ({ children, ...props }) {
  return <Paper {...props}>{children}</Paper>
}
