import { createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  tableContent: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}))

interface _Props {
  meta: object
}

const TableContent: React.FC<_Props> = ({ meta }) => {
  const { classes } = useStyles()

  return <div className={classes.tableContent}>TableContent</div>
}

export default TableContent
