import Container from '@material-ui/core/Container'

export default function ({ children, ...props }) {
  return <Container {...props}>{children}</Container>
}
