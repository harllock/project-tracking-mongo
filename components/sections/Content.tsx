/**
 * Content component holds central part of the app layout between
 * header and footer
 */
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
    justifyContent: "center",
  },
}))

interface _Props {
  children: JSX.Element
}

export const Content: React.FC<_Props> = ({ children }: _Props) => {
  const { classes } = useStyles()

  return <div className={classes.content}>{children}</div>
}
