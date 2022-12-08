import { createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  toolBar: {
    background: "white",
    height: 100,
    minHeight: 100,
    /**
     * set width to 100% of available space and then subtract 20px + 20px
     * to have padding as per app layout design
     */
    width: "calc(100% - 40px)",
    marginBottom: 20,
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}))

interface _Props {
  meta: object
}

const ToolBar: React.FC<_Props> = ({ meta }) => {
  const { classes } = useStyles()

  return <div className={classes.toolBar}>Toolbar</div>
}

export default ToolBar
