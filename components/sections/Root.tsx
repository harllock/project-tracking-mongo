import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.gray[1],
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Root {
  /** multiple children component */
  children: JSX.Element[]
}

const Root: React.FC<_Root> = ({ children }) => {
  const { classes } = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default Root
