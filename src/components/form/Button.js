import Button from '@material-ui/core/Button'

export default function ({
  variant = 'contained',
  children,
  color = 'secondary',
  ...props
}) {
  return (
    <Button variant={variant} color={color} {...props}>
      {children}
    </Button>
  )
}
