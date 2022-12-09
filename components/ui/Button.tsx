import { Button as MantineButton } from "@mantine/core"

interface _Props {
  children: string
  onClick: () => void
}

const Button: React.FC<_Props> = ({ children, onClick }: _Props) => {
  return <MantineButton onClick={onClick}>{children}</MantineButton>
}

export default Button
