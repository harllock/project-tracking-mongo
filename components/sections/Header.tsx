import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.blue[8],
    height: 70,
    minHeight: 70,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}))

export const Header: React.FC = () => {
  const { classes } = useStyles()

  return <div className={classes.header}>Header</div>
}
