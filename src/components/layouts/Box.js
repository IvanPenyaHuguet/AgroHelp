import Box from '@mui/material/Box'

export default function ({ children, ...props }) {
  return <Box {...props}>{children}</Box>
}