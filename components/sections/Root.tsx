import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.gray[1],
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  /** multiple children component */
  children: JSX.Element[]
}

export const Root: React.FC<_Props> = ({ children }: _Props) => {
  const { classes } = useStyles()

  return <div className={classes.root}>{children}</div>
}
