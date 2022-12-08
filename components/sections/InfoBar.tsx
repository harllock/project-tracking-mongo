import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  infoBar: {
    backgroundColor: theme.colors.dark[4],
    width: "20%",
    minWidth: "20%",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
  },
}))

const InfoBar: React.FC = () => {
  const { classes } = useStyles()

  return <div className={classes.infoBar}>InfoBar</div>
}

export default InfoBar
