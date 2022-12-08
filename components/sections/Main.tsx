import { createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  main: {
    width: "80%",
    minWidth: "80%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "orange",
  },
}))

const Main: React.FC = () => {
  const { classes } = useStyles()

  return <div className={classes.main}>Main</div>
}

export default Main
