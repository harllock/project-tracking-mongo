import { Modal as MantineModal, useMantineTheme } from "@mantine/core"

interface _Props {
  children: JSX.Element
  onClose: () => void
  opened: boolean
  size: string
  title: string
}

export const Modal: React.FC<_Props> = ({
  children,
  onClose,
  opened,
  size,
  title,
}: _Props) => {
  const theme = useMantineTheme()

  return (
    <MantineModal
      centered
      onClose={onClose}
      opened={opened}
      overflow="inside"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.85}
      size={size}
      title={title}
    >
      {children}
    </MantineModal>
  )
}
