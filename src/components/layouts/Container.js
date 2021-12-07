import Container from '@mui/material/Container'

export default function ({ children, ...props }) {
  return <Container {...props}>{children}</Container>
}
