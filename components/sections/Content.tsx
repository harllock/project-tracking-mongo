import { createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  content: {
    paddingLeft: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    /**
     * paddingRight is set to zero because will be dynamically set by
     * ToolBar and Table components
     */
    paddingRight: "0px",
    /**
     * using fixed height is nedeed to allow calculation in inner components;
     * otherwise it is not needed here because of flexGrow
     */
    height: "50vh",
    width: "100%",
    flexGrow: 1,
    display: "flex",
  },
}))

interface _Content {
  children: JSX.Element
}

const Content: React.FC<_Content> = ({ children }) => {
  const { classes } = useStyles()

  return <div className={classes.content}>{children}</div>
}

export default Content
