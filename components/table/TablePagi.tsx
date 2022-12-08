import { createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  tablePagi: {
    heigh: 70,
    minHeight: 70,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "purple",
  },
}))

interface _Props {
  meta: object
}

const TablePagi: React.FC<_Props> = ({ meta }) => {
  const { classes } = useStyles()

  return <div className={classes.tablePagi}>TablePagi</div>
}

export default TablePagi
