import Button from '@mui/material/Button';

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
